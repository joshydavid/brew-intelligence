import {
  BrewIntelligenceInput,
  BrewIntelligenceSelect,
} from "@/components/BrewIntelligenceForm/";
import { MethodType } from "@/lib/constants/coffee-listing";
import { Control, FieldValues } from "react-hook-form";

interface CommonFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  enumValues?: any;
}

interface BrewFieldConfig<T extends FieldValues> {
  component: any;
  props: Omit<CommonFieldProps<T>, "control">;
}

export default function CoffeeRecipeFields<T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) {
  const coffeeRecipeFields: BrewFieldConfig<T>[] = [
    {
      component: BrewIntelligenceInput,
      props: {
        type: "string",
        name: "createdBy",
        label: "Barista",
        placeholder: "Who crafted this recipe?",
      },
    },
    {
      component: BrewIntelligenceSelect,
      props: {
        name: "methodType",
        label: "Brew Method",
        placeholder: "Select method",
        enumValues: MethodType,
      },
    },
    {
      component: BrewIntelligenceInput,
      props: {
        type: "number",
        name: "coffeeDose",
        label: "Coffee Dose (g)",
        placeholder: "15g",
      },
    },
    {
      component: BrewIntelligenceInput,
      props: {
        type: "number",
        name: "waterAmount",
        label: "Water Amount",
        placeholder: "e.g 250",
      },
    },
    {
      component: BrewIntelligenceInput,
      props: {
        type: "number",
        name: "brewTemp",
        label: "Brew Temp (°C)",
        placeholder: "93",
      },
    },
    {
      component: BrewIntelligenceInput,
      props: {
        type: "string",
        name: "brewTime",
        label: "Brew Time",
        placeholder: "02:30s",
      },
    },
  ];

  return (
    <>
      {coffeeRecipeFields.map(({ component: Component, props }) => (
        <Component key={props.name} control={control} {...props} />
      ))}
    </>
  );
}
