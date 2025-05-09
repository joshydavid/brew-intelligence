"use client";

import { getRequest } from "@/api/getRequest";
import ParentWrapper from "@/bi/ParentWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import Brew from "@/public/brew.jpg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function DisplayCoffeeRecipes() {
  const {
    data: coffeeRecipes,
    error: coffeeRecipesErr,
    isLoading: coffeeRecipesLoading,
  } = useQuery({
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

  return (
    <ParentWrapper>
      <div className="grid w-full grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:w-4/5 lg:grid-cols-3">
        {coffeeRecipes.map(
          ({
            recipeId,
            createdBy,
            methodType,
            coffeeDose,
            waterAmount,
            brewTemp,
            brewTime,
            brewInstructions,
          }: any) => (
            <Card key={recipeId}>
              <CardHeader>
                <Image
                  src={Brew}
                  alt="coffee"
                  height="1000"
                  width="1000"
                  className="h-auto w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent className="space-y-6">
                <CardTitle className="text-xl">{createdBy}'s Recipe</CardTitle>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary">{methodType}</Badge>
                  <Badge variant="secondary">{coffeeDose}g</Badge>
                  <Badge variant="secondary">{waterAmount}ml</Badge>
                  <Badge variant="secondary">{brewTemp}°C</Badge>
                  <Badge variant="secondary">{brewTime}</Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Instructions
                </p>
                <ol className="list-inside list-decimal space-y-1 text-sm text-foreground">
                  {brewInstructions.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </ParentWrapper>
  );
}
