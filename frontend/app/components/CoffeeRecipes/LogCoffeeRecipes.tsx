"use client";

import {
  BrewIntelligenceInput,
  BrewIntelligenceSelect,
} from "@/components/BrewIntelligenceForm";
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
import { MethodType } from "@/lib/constants/coffee-listing";
import {
  logCoffeeRecipeSchema,
  LogCoffeeRecipeSchema,
} from "@/schema/log-coffee-recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Check } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CoffeeRecipesBrewSteps } from "./CoffeeRecipesBrewSteps";

export default function LogCoffeeRecipes() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="rounded-3xl">
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
        <CoffeeRecipeForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

const CoffeeRecipeForm = ({ onSuccess }: { onSuccess: () => void }) => {
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
  const { mutate } = useLogRecipeMutation();
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "brewInstructions",
  });

  const onSubmit = (data: LogCoffeeRecipeSchema) => {
    const sanitisedData = {
      ...data,
      // TODO: Remove this
      userId: "1344041768141000705",
      methodType: data.methodType.toUpperCase() as MethodType,
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
          <BrewIntelligenceInput
            type="string"
            control={control}
            name="createdBy"
            label="Barista"
            placeholder="Who crafted this recipe?"
          />
          <BrewIntelligenceSelect
            control={control}
            name="methodType"
            label="Brew Method"
            placeholder="Select method"
            enumValues={MethodType}
          />
          <BrewIntelligenceInput
            type="number"
            control={control}
            name="coffeeDose"
            label="Coffee Dose (g)"
            placeholder="15g"
          />
          <BrewIntelligenceInput
            type="number"
            control={control}
            name="waterAmount"
            label="Water Amount"
            placeholder="e.g 250"
          />
          <BrewIntelligenceInput
            type="number"
            control={control}
            name="brewTemp"
            label="Brew Temp (°C)"
            placeholder="93"
          />
          <BrewIntelligenceInput
            type="string"
            control={control}
            name="brewTime"
            label="Brew Time"
            placeholder="02:30s"
          />
          <CoffeeRecipesBrewSteps
            control={control}
            fields={fields}
            remove={remove}
            append={append}
          />
          <div className="flex justify-end">
            <Button type="submit" size="md" variant="outline">
              <Check className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
