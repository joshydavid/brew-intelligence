"use client";

import { MethodType } from "@/lib/constants/coffee-listing";
import { CoffeeRecipeErrMsg } from "@/lib/constants/error-message";
import { z } from "zod";

export const logCoffeeRecipeSchema = z.object({
  methodType: z.nativeEnum(MethodType),
  coffeeDose: z.coerce
    .number({
      required_error: CoffeeRecipeErrMsg.COFFEE_DOSE_REQUIRED,
      invalid_type_error: CoffeeRecipeErrMsg.COFFEE_DOSE_NUMBER,
    })
    .min(15, { message: CoffeeRecipeErrMsg.COFFEE_DOSE_MIN }),
  waterAmount: z.coerce
    .number({
      required_error: CoffeeRecipeErrMsg.WATER_AMOUNT_REQUIRED,
      invalid_type_error: CoffeeRecipeErrMsg.WATER_AMOUNT_NUMBER,
    })
    .min(10, { message: CoffeeRecipeErrMsg.WATER_AMOUNT_MIN }),
  brewTemp: z.coerce
    .number({
      required_error: CoffeeRecipeErrMsg.BREW_TEMP_REQUIRED,
      invalid_type_error: CoffeeRecipeErrMsg.BREW_TEMP_NUMBER,
    })
    .min(0, { message: CoffeeRecipeErrMsg.BREW_TEMP_MIN }),
  brewTime: z
    .string()
    .min(1, { message: CoffeeRecipeErrMsg.BREW_TIME_REQUIRED }),
  brewInstructions: z
    .array(
      z.string().min(1, { message: CoffeeRecipeErrMsg.BREW_INSTRUCTION_EMPTY }),
    )
    .min(1, { message: CoffeeRecipeErrMsg.BREW_INSTRUCTIONS_MIN }),
  createdBy: z
    .string()
    .min(1, { message: CoffeeRecipeErrMsg.CREATED_BY_REQUIRED }),
});

export type LogCoffeeRecipeSchema = z.infer<typeof logCoffeeRecipeSchema>;
