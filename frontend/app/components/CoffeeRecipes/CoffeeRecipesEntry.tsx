"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  SelectValue,
} from "@/components/ui/select";
import { BrewMethod } from "@/lib/constants/coffee-listing";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export function CoffeeRecipesEntry() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
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
        <CoffeeRecipeForm />
        <DialogFooter>
          <Button type="submit">
            <BookOpen className="mr-1 h-4 w-4" />
            Save Recipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const CoffeeRecipeForm = () => {
  const [formData, setFormData] = useState({
    methodType: "",
    coffeeDose: "",
    waterAmount: "",
    brewTemp: "",
    brewTime: "",
    brewInstructions: [""],
    createdBy: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
        <Label className="sm:text-right">Brew Method</Label>
        <Select
          value={formData.methodType}
          onValueChange={(value) =>
            setFormData({ ...formData, methodType: value })
          }
        >
          <SelectTrigger className="w-full sm:col-span-3">
            <SelectValue placeholder="Select brewing method" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(BrewMethod).map((method) => (
              <SelectItem key={method} value={method}>
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
          placeholder="Water temp in Celsius"
          className="sm:col-span-3"
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
            <div key={i} className="flex items-center gap-2">
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
                  ×
                </Button>
              )}
            </div>
          ))}
          <Button variant="secondary" onClick={addInstruction}>
            + Add Step
          </Button>
        </div>
      </div>

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
    </div>
  );
};
