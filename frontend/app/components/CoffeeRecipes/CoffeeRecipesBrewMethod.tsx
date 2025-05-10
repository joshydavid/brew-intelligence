import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MethodType } from "@/lib/constants/coffee-listing";

export function CoffeeRecipesBrewMethod({ control }: any) {
  return (
    <FormField
      control={control}
      name="methodType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Brew Method</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(MethodType).map((method) => (
                <SelectItem key={method} value={method}>
                  {method.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
