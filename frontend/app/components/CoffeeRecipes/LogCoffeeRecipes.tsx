"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useLogRecipeMutation } from "@/hooks/apis/use-log-recipe-mutation";
import { MethodType } from "@/lib/constants/coffee-listing";
import { CoffeeRecipeDTO } from "@/models/api-dto";
import { BookOpen, Plus, X } from "lucide-react";
import { useState } from "react";

export function LogCoffeeRecipes() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="rounded-3xl">
          <BookOpen className="h-4 w-4" />
          Log Recipes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>New Brew Recipe</DialogTitle>
          <DialogDescription className="text-xs">
            Craft and record your ideal brew: dose, temp, time, and steps.
          </DialogDescription>
        </DialogHeader>
        <CoffeeRecipeForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

const CoffeeRecipeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState<Omit<CoffeeRecipeDTO, "recipeId">>({
    methodType: MethodType.ICED,
    coffeeDose: 0,
    waterAmount: 0,
    brewTemp: 0,
    brewTime: "",
    brewInstructions: [""],
    createdBy: "",
  });
  const { mutate } = useLogRecipeMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.log("Mutation failed:", error);
      },
    });
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.brewInstructions];
    newInstructions[index] = value;
    setFormData((prev) => ({ ...prev, brewInstructions: newInstructions }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      brewInstructions: [...prev.brewInstructions, ""],
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData((prev) => {
      const newInstructions = [...prev.brewInstructions];
      newInstructions.splice(index, 1);
      return { ...prev, brewInstructions: newInstructions };
    });
  };

  return (
    <div className="grid gap-8 py-4">
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label htmlFor="createdBy" className="sm:text-right">
          Creator
        </Label>
        <Input
          id="createdBy"
          value={formData.createdBy}
          onChange={handleInputChange}
          placeholder="Who crafted this recipe?"
          className="sm:col-span-3"
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label className="sm:text-right">Brew Method</Label>
        <Select
          value={formData.methodType}
          onValueChange={(value) =>
            setFormData({ ...formData, methodType: value as MethodType })
          }
        >
          <SelectTrigger className="w-full sm:col-span-3">
            <span className="text-sm font-medium text-muted-foreground">
              {formData.methodType
                ? formData.methodType.replace("_", " ")
                : "Select brewing method"}
            </span>
          </SelectTrigger>
          <SelectContent>
            {Object.values(MethodType).map((method) => (
              <SelectItem key={method} value={method.toUpperCase()}>
                {method.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label htmlFor="coffeeDose" className="sm:text-right">
          Coffee Dose (g)
        </Label>
        <Input
          id="coffeeDose"
          type="number"
          value={formData.coffeeDose}
          onChange={handleInputChange}
          placeholder="How much ground coffee?"
          className="sm:col-span-3"
          min="1"
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label htmlFor="waterAmount" className="sm:text-right">
          Water Amount (ml)
        </Label>
        <Input
          id="waterAmount"
          type="number"
          value={formData.waterAmount}
          onChange={handleInputChange}
          placeholder="How much water?"
          className="sm:col-span-3"
          min="10"
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label htmlFor="brewTemp" className="sm:text-right">
          Brew Temp (°C)
        </Label>
        <Input
          id="brewTemp"
          type="number"
          value={formData.brewTemp}
          onChange={handleInputChange}
          placeholder="Water temperature in celsius"
          className="sm:col-span-3"
          min="0"
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label htmlFor="brewTime" className="sm:text-right">
          Brew Time
        </Label>
        <Input
          id="brewTime"
          value={formData.brewTime}
          onChange={handleInputChange}
          placeholder="e.g. 2:30"
          className="sm:col-span-3"
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-4">
        <Label className="sm:text-right">Brew Steps</Label>
        <div className="grid gap-4 sm:col-span-3">
          {formData.brewInstructions.map((step, i) => (
            <div key={`${step}-${i}`} className="flex items-center gap-2">
              <Input
                value={step}
                onChange={(e) => handleInstructionChange(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
                className="flex-1"
              />
              {formData.brewInstructions.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInstruction(i)}
                >
                  <X />
                </Button>
              )}
            </div>
          ))}
          <Button variant="secondary" onClick={addInstruction} size="md">
            <Plus /> Add Step
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="md" onClick={handleSubmit}>
          <BookOpen className="mr-1 h-4 w-4" />
          Save Recipe
        </Button>
      </div>
    </div>
  );
};
