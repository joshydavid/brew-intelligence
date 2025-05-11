import BrewIntelligenceIntro from "@/components/BrewIntelligence/BrewIntelligenceIntro";
import LogCoffeeListing from "@/components/CoffeeListings/LogCoffeeListing";
import ViewBeansButton from "@/components/CoffeeListings/ViewBeansButton";
import LogCoffeeRecipes from "@/components/CoffeeRecipes/LogCoffeeRecipes";
import ViewRecipesButton from "@/components/CoffeeRecipes/ViewRecipesButton";

export default function LandingIntro() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Welcome to{" "}
        <span className="text-blue-600 dark:text-blue-500">
          Brew Intelligence.
        </span>
      </h1>
      <p className="my-6 text-lg text-gray-600 dark:text-gray-300">
        Discover the art and science of great coffee — and log your beans by
        origin, roast date, weight, and more.
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
