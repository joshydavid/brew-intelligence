"use client";

import { getRequest } from "@/api/getRequest";
import ParentWrapper from "@/bi/ParentWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { BrewMethod } from "@/lib/constants/coffee-listing";
import {
  API_ERROR_MESSAGE,
  HTTP_STATUS_CODE,
} from "@/lib/constants/error-message";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import {
  formatDate,
  getTimeFrame,
  sortByLatestDate,
} from "@/lib/constants/utils";
import { CoffeeListingDTO } from "@/models/api-dto";
import Espresso from "@/public/Espresso.jpeg";
import V60 from "@/public/V60.jpg";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";

export default function DisplayCoffeeListings() {
  const {
    data: coffeeListings,
    error: coffeeListingsErr,
    isLoading: coffeeListingsLoading,
  } = useQuery<CoffeeListingDTO[], AxiosError<string>>({
    queryKey: [QUERY_KEYS.COFFEE_LISTINGS],
    queryFn: () => getRequest(API_ROUTES.COFFEE_LISTINGS),
    retry: 1,
  });

  if (coffeeListingsErr) {
    switch (coffeeListingsErr.status) {
      case HTTP_STATUS_CODE.FORBIDDEN:
        return (
          <ParentWrapper>
            <div className="flex min-h-[calc(100vh-100px)] items-center text-lg">
              {API_ERROR_MESSAGE.ERROR_403_FORBIDDEN}
            </div>
          </ParentWrapper>
        );
      case HTTP_STATUS_CODE.TOO_MANY_REQUESTS:
        return (
          <ParentWrapper>
            <div className="flex min-h-[calc(100vh-100px)] items-center text-lg">
              {API_ERROR_MESSAGE.ERROR_409_RATE_LIMIT_EXCEEDED}
            </div>
          </ParentWrapper>
        );
      default:
        return (
          <ParentWrapper>
            <div className="flex min-h-[calc(100vh-100px)] items-center text-lg">
              {coffeeListingsErr?.response?.data}
            </div>
          </ParentWrapper>
        );
    }
  }

  if (coffeeListingsLoading)
    return (
      <ParentWrapper>
        <Loader />
      </ParentWrapper>
    );

  const sortedCoffeeListings = sortByLatestDate(
    coffeeListings ?? [],
    "createdAt",
  );

  const getCoffeeImage = (brewMethod: BrewMethod) => {
    switch (brewMethod) {
      case BrewMethod.ESPRESSO:
        return Espresso;
      case BrewMethod.V60:
        return V60;
      default:
        return Espresso;
    }
  };

  return (
    <ParentWrapper>
      <div className="grid w-full grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:w-4/5 lg:grid-cols-3">
        {sortedCoffeeListings.map(
          ({
            listingId,
            coffeeName,
            roastType,
            brewMethod,
            roastDate,
            createdAt,
          }: CoffeeListingDTO) => (
            <Card key={listingId}>
              <CardHeader className="relative h-55 overflow-hidden">
                <Image
                  src={getCoffeeImage(brewMethod)}
                  alt="coffee"
                  height="1000"
                  width="1000"
                  className="h-auto w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <CardTitle className="max-w-[200px] text-xl">
                    {coffeeName}
                  </CardTitle>
                  <div className="flex justify-end">
                    <Badge variant="outline" className="px-3.5 py-2">
                      {getTimeFrame(createdAt)}
                    </Badge>
                  </div>
                </div>
                <div className="my-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{roastType}</Badge>
                  <Badge variant="secondary">
                    {BrewMethod[brewMethod as keyof typeof BrewMethod]}
                  </Badge>
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  Roast Date
                </p>
                <p className="text-sm">{formatDate(new Date(roastDate))}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </ParentWrapper>
  );
}
