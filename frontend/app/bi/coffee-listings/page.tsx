"use client";

import { getRequest } from "@/api/getRequest";
import ParentWrapper from "@/bi/ParentWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { formatDate, sortByLatestDate } from "@/lib/constants/utils";
import { useQuery } from "@tanstack/react-query";

export default function DisplayListings() {
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
                <CardTitle className="text-xl">{coffeeName}</CardTitle>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">{roastType}</Badge>
                  <Badge variant="outline">{brewMethod}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                Roast Date {formatDate(new Date(roastDate))}
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </ParentWrapper>
  );
}
