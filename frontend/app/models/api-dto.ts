import {
  BrewMethod,
  MethodType,
  RoastType,
} from "@/lib/constants/coffee-listing";

export interface CoffeeListingDTO {
  listingId: string;
  coffeeName: string;
  roastDate: Date;
  weightInKg: string;
  roastType: RoastType;
  brewMethod: BrewMethod;
  createdAt: Date;
}

export interface CoffeeRecipeDTO {
  recipeId: string;
  createdBy: string;
  methodType: MethodType;
  coffeeDose: number;
  waterAmount: number;
  brewTemp: number;
  brewTime: string;
  brewInstructions: string[];
  createdAt: Date;
}
