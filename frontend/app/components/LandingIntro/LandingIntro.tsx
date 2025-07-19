import BrewIntelligenceIntro from "@/components/BrewIntelligence/BrewIntelligenceIntro";
import LogCoffeeListing from "@/components/CoffeeListings/LogCoffeeListing";
import LogCoffeeRecipes from "@/components/CoffeeRecipes/LogCoffeeRecipes";
import ViewButton from "@/components/ViewButton";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { APP } from "@/lib/constants/metadata";
import { BookOpen, Coffee } from "lucide-react";

export default function LandingIntro() {
  return (
    <div className="mx-auto max-w-2xl px-2">
      <h1 className="text-4xl text-gray-900 dark:text-white">
        Welcome to{" "}
        <span className="text-blue-600 dark:text-blue-500">{APP.NAME}.</span>
      </h1>
      <p className="my-6 text-sm text-gray-600 md:text-lg dark:text-gray-300">
        {APP.LONG_DESCRIPTION}
      </p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <ViewButton
          clientRoute={CLIENT_ROUTES.COFFEE_LISTINGS}
          btnIcon={<Coffee className="h-4 w-4" />}
          btnName="View Beans"
        />
        <LogCoffeeListing />
        <ViewButton
          clientRoute={CLIENT_ROUTES.COFFEE_RECIPES}
          btnIcon={<BookOpen className="h-4 w-4" />}
          btnName="View Recipes"
        />
        <LogCoffeeRecipes />
        <BrewIntelligenceIntro />
      </div>
    </div>
  );
}
