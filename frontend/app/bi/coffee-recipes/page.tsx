"use client";

import { getRequest } from "@/api/getRequest";
import ParentWrapper from "@/bi/ParentWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { getTimeFrame, sortByLatestDate } from "@/lib/constants/utils";
import { CoffeeRecipeDTO } from "@/models/api-dto";
import Brew from "@/public/brew.jpg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function DisplayCoffeeRecipes() {
  const {
    data: coffeeRecipes,
    error: coffeeRecipesErr,
    isLoading: coffeeRecipesLoading,
  } = useQuery<CoffeeRecipeDTO[]>({
    queryKey: [QUERY_KEYS.COFFEE_RECIPES],
    queryFn: () => getRequest(API_ROUTES.RECIPES),
  });

  if (coffeeRecipesErr) return <ParentWrapper>Error</ParentWrapper>;
  if (coffeeRecipesLoading)
    return (
      <ParentWrapper>
        <Loader />
      </ParentWrapper>
    );

  const sortedCoffeeRecipes = sortByLatestDate(
    coffeeRecipes ?? [],
    "createdAt",
  );

  return (
    <ParentWrapper>
      <div className="grid w-full grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:w-4/5 lg:grid-cols-3">
        {sortedCoffeeRecipes?.map(
          ({
            recipeId,
            createdBy,
            methodType,
            coffeeDose,
            waterAmount,
            brewTemp,
            brewTime,
            brewInstructions,
            createdAt,
          }: CoffeeRecipeDTO) => (
            <Card key={recipeId}>
              <CardHeader className="relative h-50 overflow-hidden">
                <Image
                  src={Brew}
                  alt="coffee"
                  height="1000"
                  width="1000"
                  className="h-auto w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="max-w-[200px] text-xl">
                    {createdBy}
                  </CardTitle>
                  <div>
                    <Badge variant="outline" className="px-4 py-2">
                      {getTimeFrame(createdAt)}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{methodType}</Badge>
                  <Badge variant="secondary">{coffeeDose}g</Badge>
                  <Badge variant="secondary">{waterAmount}ml</Badge>
                  <Badge variant="secondary">{brewTemp}°C</Badge>
                  <Badge variant="secondary">{brewTime}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Instructions
                  </p>
                  <ol className="list-inside list-decimal space-y-1.5 pt-2 text-sm text-foreground">
                    {brewInstructions.map((step: string, index: number) => (
                      <li key={`step-${index}`}>{step}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </ParentWrapper>
  );
}
