import {
  BrewMethod,
  MethodType,
  RoastType,
} from "@/lib/constants/coffee-listing";

export interface AuthDTO {
  userId: string;
  name: string;
}
export interface CoffeeListingDTO {
  listingId: string;
  userId: string;
  coffeeName: string;
  roastDate: Date;
  weightInKg: string;
  roastType: RoastType;
  brewMethod: BrewMethod;
  createdAt: Date;
}

export interface CoffeeRecipeDTO {
  recipeId: string;
  userId: string;
  createdBy: string;
  methodType: MethodType;
  coffeeDose: number;
  waterAmount: number;
  brewTemp: number;
  brewTime: string;
  brewInstructions: string[];
  createdAt: Date;
}
