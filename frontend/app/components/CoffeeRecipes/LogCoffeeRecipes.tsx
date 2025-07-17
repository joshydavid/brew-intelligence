"use client";

import HashLoaderSpinner from "@/components/Spinner/HashLoaderSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useLogRecipeMutation } from "@/hooks/apis/use-log-recipe-mutation";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { MethodType } from "@/lib/constants/coffee-listing";
import { COFFEE_RECIPE_MESSAGE } from "@/lib/constants/message";
import { handleSuccess } from "@/lib/constants/utils";
import {
  logCoffeeRecipeSchema,
  LogCoffeeRecipeSchema,
} from "@/schema/log-coffee-recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Check } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import CoffeeRecipeFields from "./CoffeeRecipeFields";
import { CoffeeRecipesBrewSteps } from "./CoffeeRecipesBrewSteps";

export default function LogCoffeeRecipes() {
  const [open, setOpen] = useState<boolean>(false);
  const { authData } = useAuthStatus();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="rounded-3xl"
          disabled={!authData?.userId}
        >
          <BookOpen className="h-4 w-4" />
          <p className="text-xs md:text-sm">Log Recipes</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>New Brew Recipe</DialogTitle>
          <DialogDescription className="text-xs">
            Craft and record your ideal brew: dose, temp, time, and steps.
          </DialogDescription>
        </DialogHeader>
        <CoffeeRecipeForm
          onSuccess={() =>
            handleSuccess(
              COFFEE_RECIPE_MESSAGE.RECIPE_SUCCESSFULLY_ADDED,
              setOpen,
            )
          }
        />
      </DialogContent>
    </Dialog>
  );
}

const CoffeeRecipeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { authData } = useAuthStatus();
  const addCoffeeRecipeForm = useForm<LogCoffeeRecipeSchema>({
    resolver: zodResolver(logCoffeeRecipeSchema),
    defaultValues: {
      methodType: MethodType.ICED,
      coffeeDose: 0,
      waterAmount: 0,
      brewTemp: 0,
      brewTime: "",
      brewInstructions: [""],
      createdBy: "",
    },
  });

  const { control, handleSubmit } = addCoffeeRecipeForm;
  const { mutate, isPending } = useLogRecipeMutation();
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "brewInstructions",
  });

  const onSubmit = (data: LogCoffeeRecipeSchema) => {
    const sanitisedData = {
      ...data,
      userId: authData?.userId,
      methodType: data.methodType.toUpperCase(),
    };
    mutate(sanitisedData, {
      onSuccess: () => onSuccess(),
      //   onError: (error) => console.error("Mutation failed:", error),
    });
  };

  return (
    <Form {...addCoffeeRecipeForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 py-4">
          <CoffeeRecipeFields control={control} />
          <CoffeeRecipesBrewSteps
            control={control}
            fields={fields}
            remove={remove}
            append={append}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              variant="outline"
              disabled={isPending}
            >
              {isPending ? (
                <HashLoaderSpinner />
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
