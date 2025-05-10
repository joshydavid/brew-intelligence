import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface BrewIntelligenceInputProps<T extends FieldValues> {
  control: Control<T>;
  type: string;
  name: Path<T>;
  label: string;
  placeholder: string;
}

export function BrewIntelligenceInput<T extends FieldValues>({
  control,
  type,
  name,
  label,
  placeholder,
}: Readonly<BrewIntelligenceInputProps<T>>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
