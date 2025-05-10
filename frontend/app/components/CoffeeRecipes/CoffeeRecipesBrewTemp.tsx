import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CoffeeRecipesBrewTemp({ control }: any) {
  return (
    <FormField
      control={control}
      name="brewTemp"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Brew Temp (°C)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="e.g. 93" min={0} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
