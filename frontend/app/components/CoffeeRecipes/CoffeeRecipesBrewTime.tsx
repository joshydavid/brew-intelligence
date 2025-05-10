"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CoffeeRecipesBrewTime({ control }: any) {
  return (
    <FormField
      control={control}
      name="brewTime"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Brew Time</FormLabel>
          <FormControl>
            <Input placeholder="e.g. 2:30" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
