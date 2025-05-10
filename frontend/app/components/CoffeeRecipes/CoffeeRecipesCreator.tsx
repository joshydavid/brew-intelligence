import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CoffeeRecipesCreator({ control }: any) {
  return (
    <FormField
      control={control}
      name="createdBy"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Creator</FormLabel>
          <FormControl>
            <Input placeholder="Who crafted this recipe?" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
