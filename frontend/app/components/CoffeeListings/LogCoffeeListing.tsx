"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLogCoffeeMutation } from "@/hooks/apis/use-log-coffee-mutation";
import { BrewMethod, RoastType } from "@/lib/constants/coffee-listing";
import { format } from "date-fns";
import { Coffee } from "lucide-react";
import { useState } from "react";

export function LogCoffeeListing() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Coffee className="h-4 w-4" />
          Log Beans
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Coffee Bean Log</DialogTitle>
          <DialogDescription className="text-xs">
            Log details like roast date, weight, and brew method.
          </DialogDescription>
        </DialogHeader>
        <CoffeeListingEntryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

const CoffeeListingEntryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    coffeeName: "",
    roastDate: new Date(),
    weightInKg: "",
    roastType: "",
    brewMethod: "",
  });
  const { mutate } = useLogCoffeeMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="grid gap-5 py-4">
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label htmlFor="coffeeName" className="sm:text-right">
          Name
        </Label>
        <Input
          id="coffeeName"
          value={formData.coffeeName}
          onChange={handleChange}
          className="w-full sm:col-span-3"
          placeholder="Ethiopia Yirgacheffe"
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label className="sm:text-right">Roast Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal sm:col-span-3"
            >
              {formData.roastDate
                ? format(formData.roastDate, "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.roastDate}
              onSelect={(date) =>
                date && setFormData({ ...formData, roastDate: date })
              }
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label htmlFor="weightInKg" className="sm:text-right">
          Weight (kg)
        </Label>
        <Input
          id="weightInKg"
          type="number"
          value={formData.weightInKg}
          onChange={handleChange}
          className="sm:col-span-3"
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label className="sm:text-right">Roast Type</Label>
        <Select
          value={formData.roastType}
          onValueChange={(value) =>
            setFormData({ ...formData, roastType: value })
          }
        >
          <SelectTrigger className="w-full sm:col-span-3">
            <SelectValue placeholder="Select roast type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(RoastType).map((type) => (
              <SelectItem key={type} value={type.toUpperCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
        <Label className="sm:text-right">Brew Method</Label>
        <Select
          value={formData.brewMethod}
          onValueChange={(value) =>
            setFormData({ ...formData, brewMethod: value })
          }
        >
          <SelectTrigger className="w-full sm:col-span-3">
            <SelectValue placeholder="Select brew method" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(BrewMethod).map((method) => (
              <SelectItem key={method} value={method.toUpperCase()}>
                {method.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg" onClick={handleSubmit}>
          <Coffee className="mr-1 h-4 w-4" />
          Log Beans
        </Button>
      </div>
    </div>
  );
};
