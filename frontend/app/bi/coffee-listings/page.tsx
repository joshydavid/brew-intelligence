"use client";

import { getRequest } from "@/api/getRequest";
import ParentWrapper from "@/bi/ParentWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { formatDate, sortByLatestDate } from "@/lib/constants/utils";
import Coffee from "@/public/coffee.jpg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function DisplayCoffeeListings() {
  const {
    data: coffeeListings,
    error: coffeeListingsErr,
    isLoading: coffeeListingsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.COFFEE_LISTINGS],
    queryFn: () => getRequest(API_ROUTES.COFFEE_LISTINGS),
  });

  if (coffeeListingsErr) return <ParentWrapper>Error</ParentWrapper>;
  if (coffeeListingsLoading)
    return (
      <ParentWrapper>
        <Loader />
      </ParentWrapper>
    );

  const sortedCoffeeListings = sortByLatestDate(coffeeListings, "roastDate");

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
          }: any) => (
            <Card key={listingId}>
              <CardHeader>
                <Image
                  src={Coffee}
                  alt="coffee"
                  height="1000"
                  width="1000"
                  className="h-auto w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <CardTitle className="text-xl">{coffeeName}</CardTitle>
                <div className="my-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{roastType}</Badge>
                  <Badge variant="secondary">{brewMethod}</Badge>
                </div>

                <p className="text-xs font-medium text-muted-foreground">
                  Roast Date
                </p>
                <p>{formatDate(new Date(roastDate))}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </ParentWrapper>
  );
}
