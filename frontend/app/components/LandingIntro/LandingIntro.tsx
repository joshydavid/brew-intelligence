import { BookOpen } from "lucide-react";
import BrewIntelligenceIntro from "../BrewIntelligence/BrewIntelligenceIntro";
import CoffeeListings from "../CoffeeListings/CoffeeListings";
import { CoffeeListingsEntry } from "../CoffeeListings/CoffeeListingsEntry";
import { CoffeeRecipesEntry } from "../CoffeeRecipes/CoffeeRecipesEntry";
import { Button } from "../ui/button";

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <CoffeeListings />

        <Button size="lg">
          <BookOpen className="h-4 w-4" />
          View Recipes
        </Button>

        <CoffeeListingsEntry />
        <CoffeeRecipesEntry />
        <BrewIntelligenceIntro />
      </div>
    </div>
  );
}
