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
import { Control, FieldValues, Path } from "react-hook-form";

type EnumLike = { [key: string]: string | number };

interface BrewIntelligenceSelectProps<
  T extends FieldValues,
  E extends EnumLike,
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  enumValues: E;
}

export function BrewIntelligenceSelect<
  T extends FieldValues,
  E extends EnumLike,
>({
  control,
  name,
  label,
  placeholder,
  enumValues,
}: Readonly<BrewIntelligenceSelectProps<T, E>>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(enumValues).map((enumValues: any) => (
                <SelectItem key={enumValues} value={enumValues}>
                  {enumValues.replace("_", " ")}
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
