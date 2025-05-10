"use client";

import { BrewMethod, RoastType } from "@/lib/constants/coffee-listing";
import { CoffeeListingErrMsg } from "@/lib/constants/error-message";
import { z } from "zod";

export const logCoffeeListingSchema = z.object({
  coffeeName: z
    .string()
    .min(1, { message: CoffeeListingErrMsg.COFFEE_NAME_REQUIRED }),
  roastDate: z.date({
    required_error: CoffeeListingErrMsg.ROAST_DATE_REQUIRED,
  }),
  weightInKg: z.coerce
    .number({
      required_error: CoffeeListingErrMsg.WEIGHT_REQUIRED,
      invalid_type_error: CoffeeListingErrMsg.WEIGHT_NUMBER,
    })
    .min(0.01, { message: CoffeeListingErrMsg.WEIGHT_MIN }),
  roastType: z.nativeEnum(RoastType, {
    errorMap: () => ({ message: CoffeeListingErrMsg.ROAST_TYPE_REQUIRED }),
  }),
  brewMethod: z.nativeEnum(BrewMethod, {
    errorMap: () => ({ message: CoffeeListingErrMsg.BREW_METHOD_REQUIRED }),
  }),
});

export type LogCoffeeListingSchema = z.infer<typeof logCoffeeListingSchema>;
