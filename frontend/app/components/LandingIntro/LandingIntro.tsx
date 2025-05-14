import BrewIntelligenceIntro from "@/components/BrewIntelligence/BrewIntelligenceIntro";
import LogCoffeeListing from "@/components/CoffeeListings/LogCoffeeListing";
import ViewBeansButton from "@/components/CoffeeListings/ViewBeansButton";
import LogCoffeeRecipes from "@/components/CoffeeRecipes/LogCoffeeRecipes";
import ViewRecipesButton from "@/components/CoffeeRecipes/ViewRecipesButton";
import { APP } from "@/lib/constants/marketing";

export default function LandingIntro() {
  return (
    <div className="mx-auto max-w-2xl px-2 py-12">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
        Welcome to{" "}
        <span className="text-blue-600 dark:text-blue-500">{APP.NAME}.</span>
      </h1>
      <p className="my-6 text-sm text-gray-600 md:text-lg dark:text-gray-300">
        {APP.LONG_DESCRIPTION}
      </p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <ViewBeansButton />
        <LogCoffeeListing />
        <ViewRecipesButton />
        <LogCoffeeRecipes />
        <BrewIntelligenceIntro />
      </div>
    </div>
  );
}
