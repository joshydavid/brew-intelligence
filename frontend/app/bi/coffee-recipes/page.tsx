"use client";

import { getRequest } from "@/api/getRequest";
import ParentWrapper from "@/bi/ParentWrapper";
import { CTADialog } from "@/components/CTADialog";
import {
  ErrorMessage,
  renderErrorMessageByStatus,
} from "@/components/ErrorMessage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { useDeleteCoffeeRecipeMutation } from "@/hooks/apis/use-delete-coffee-recipe";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { MethodType } from "@/lib/constants/coffee-listing";
import { COFFEE_RECIPE_MESSAGE } from "@/lib/constants/message";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { S3_IMAGES } from "@/lib/constants/s3-images";
import { getTimeFrame, sortByLatestDate } from "@/lib/constants/utils";
import { CoffeeRecipeDTO } from "@/models/api-dto";
import Empty from "@/public/empty.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function DisplayCoffeeRecipes() {
  const { authData } = useAuthStatus();
  const queryClient = useQueryClient();
  const { mutate: deleteCoffeeRecipe } = useDeleteCoffeeRecipeMutation();
  const {
    data: coffeeRecipes,
    error: coffeeRecipesErr,
    isLoading: coffeeRecipesLoading,
  } = useQuery<CoffeeRecipeDTO[], AxiosError<string>>({
    queryKey: [QUERY_KEYS.COFFEE_RECIPES],
    queryFn: () => getRequest(`${API_ROUTES.RECIPES}/${authData?.userId}`),
    retry: 1,
  });

  if (coffeeRecipesErr) {
    const errorComponent = renderErrorMessageByStatus(coffeeRecipesErr.status!);
    if (errorComponent) return errorComponent;
    return (
      <ParentWrapper>
        <div className="flex min-h-[calc(100vh-100px)] items-center text-lg">
          {coffeeRecipesErr?.response?.data}{" "}
        </div>
      </ParentWrapper>
    );
  }

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

  const handleDelete = (recipeId: string) => {
    deleteCoffeeRecipe(recipeId, {
      onSuccess: () => {
        toast.success(COFFEE_RECIPE_MESSAGE.RECIPE_SUCCESSFULLY_DELETED);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.COFFEE_RECIPES],
        });
      },
      onError: () => {
        toast.error(COFFEE_RECIPE_MESSAGE.RECIPE_DELETION_FAILED);
      },
    });
  };

  return (
    <ParentWrapper>
      {sortedCoffeeRecipes.length < 1 ? (
        <ErrorMessage
          image={
            <Image
              src={Empty}
              alt="not-found"
              width={300}
              height={300}
              className="pb-4"
            />
          }
          header="Empty"
          message="No recipes found. Add some?"
        />
      ) : (
        <div className="grid w-full grid-cols-1 gap-8 pb-12 sm:grid-cols-2 md:w-4/5 md:py-12 lg:grid-cols-3">
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
                <CardHeader className="relative h-55 overflow-hidden">
                  <div className="absolute top-2 right-2 z-10">
                    <CTADialog
                      btn={<X color="white" />}
                      variant="ghost"
                      alertDescription="This action cannot be undone. Your listing will be permanently deleted from our servers."
                      handleDelete={() => handleDelete(recipeId)}
                    />
                  </div>
                  <Image
                    src={S3_IMAGES.BREW}
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
                    <Badge variant="secondary">
                      {
                        MethodType[
                          methodType as unknown as keyof typeof MethodType
                        ]
                      }
                    </Badge>
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
      )}
    </ParentWrapper>
  );
}
