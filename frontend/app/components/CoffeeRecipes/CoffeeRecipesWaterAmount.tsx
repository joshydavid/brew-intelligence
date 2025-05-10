import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CoffeeRecipesWaterAmount({ control }: any) {
  return (
    <FormField
      control={control}
      name="waterAmount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Water Amount (ml)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="e.g. 250" min={0} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
