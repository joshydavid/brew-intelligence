"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CoffeeRecipesDose({ control }: any) {
  return (
    <FormField
      control={control}
      name="coffeeDose"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Coffee Dose (g)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="e.g. 18" min={0} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
