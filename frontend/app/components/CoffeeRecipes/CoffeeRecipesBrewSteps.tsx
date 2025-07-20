"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

export function CoffeeRecipesBrewSteps({
  control,
  fields,
  remove,
  append,
}: any) {
  return (
    <div>
      <FormLabel>Brew Steps</FormLabel>
      <div className="space-y-3 py-2">
        {fields.map((fieldItem: any, index: number) => (
          <FormField
            key={fieldItem.id}
            control={control}
            name={`brewInstructions.${index}`}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl className="flex-1">
                  <Input placeholder={`Step ${index + 1}`} {...field} />
                </FormControl>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>
                )}
              </FormItem>
            )}
          />
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        className="mt-2"
        onClick={() => append("")}
      >
        <Plus className="h-4 w-4" />
        Add Step
      </Button>
    </div>
  );
}
