"use client";

import {
  BrewIntelligenceDate,
  BrewIntelligenceInput,
  BrewIntelligenceSelect,
} from "@/components/BrewIntelligenceForm/";
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
import { useLogCoffeeMutation } from "@/hooks/apis/use-log-coffee-mutation";
import { BrewMethod, RoastType } from "@/lib/constants/coffee-listing";
import { COFFEE_LISTING_SUCCESS_MESSAGE } from "@/lib/constants/success-message";
import { handleSuccess } from "@/lib/constants/utils";
import {
  logCoffeeListingSchema,
  LogCoffeeListingSchema,
} from "@/schema/log-coffee-listings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Coffee } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LogCoffeeListing() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="rounded-3xl">
          <Coffee className="h-4 w-4" />
          <p className="text-xs md:text-sm">Log Beans</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Coffee Bean Log</DialogTitle>
          <DialogDescription className="text-xs">
            Log details like roast date, weight, and brew method.
          </DialogDescription>
        </DialogHeader>
        <CoffeeListingEntryForm
          onSuccess={() =>
            handleSuccess(
              COFFEE_LISTING_SUCCESS_MESSAGE.LISTING_SUCCESSFULLY_ADDED,
              setOpen,
            )
          }
        />
      </DialogContent>
    </Dialog>
  );
}

const CoffeeListingEntryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const addCoffeeListingForm = useForm<LogCoffeeListingSchema>({
    resolver: zodResolver(logCoffeeListingSchema),
    defaultValues: {
      coffeeName: "",
      roastDate: new Date(),
      weightInKg: 0,
      roastType: RoastType.LIGHT,
      brewMethod: BrewMethod.V60,
    },
  });

  const { control, handleSubmit } = addCoffeeListingForm;
  const { mutate } = useLogCoffeeMutation();
  const onSubmit = (data: LogCoffeeListingSchema) => {
    const sanitisedData = {
      ...data,
      // TODO: Remove this
      userId: "1344041768141000705",
      roastType: data.roastType.toUpperCase() as RoastType,
    };
    mutate(sanitisedData, {
      onSuccess: () => onSuccess(),
      //   onError: (error) => console.error("Mutation failed:", error),
    });
  };

  return (
    <Form {...addCoffeeListingForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 py-4">
          <BrewIntelligenceInput
            type="string"
            control={control}
            name="coffeeName"
            label="Coffee"
            placeholder="Ethiopia Yirgacheffe"
          />
          <BrewIntelligenceDate
            control={control}
            name="roastDate"
            label="Roast Date"
          />
          <BrewIntelligenceInput
            type="string"
            control={control}
            name="weightInKg"
            label="Weight (kg)"
            placeholder="Ethiopia Yirgacheffe"
          />
          <BrewIntelligenceSelect
            control={control}
            name="roastType"
            label="Roast Type"
            placeholder="Select roast type"
            enumValues={RoastType}
          />
          <BrewIntelligenceSelect
            control={control}
            name="brewMethod"
            label="Brew Method"
            placeholder="Select brew method"
            enumValues={BrewMethod}
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
