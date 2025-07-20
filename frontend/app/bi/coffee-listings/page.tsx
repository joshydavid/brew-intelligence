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
import { useDeleteCoffeeListingMutation } from "@/hooks/apis/use-delete-coffee-mutation";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { BrewMethod, RoastType } from "@/lib/constants/coffee-listing";
import { COFFEE_LISTING_MESSAGE } from "@/lib/constants/message";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { S3_IMAGES } from "@/lib/constants/s3-images";
import {
  formatDate,
  getTimeFrame,
  sortByLatestDate,
} from "@/lib/constants/utils";
import { CoffeeListingDTO } from "@/models/api-dto";
import Empty from "@/public/empty.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function DisplayCoffeeListings() {
  const { authData } = useAuthStatus();
  const queryClient = useQueryClient();
  const { mutate: deleteCoffeeListing } = useDeleteCoffeeListingMutation();
  const {
    data: coffeeListings,
    error: coffeeListingsErr,
    isLoading: coffeeListingsLoading,
  } = useQuery<CoffeeListingDTO[], AxiosError<string>>({
    queryKey: [QUERY_KEYS.COFFEE_LISTINGS],
    queryFn: () =>
      getRequest(`${API_ROUTES.COFFEE_LISTINGS}/${authData?.userId}`),
    retry: 1,
  });

  if (coffeeListingsErr) {
    const errorComponent = renderErrorMessageByStatus(
      coffeeListingsErr.status!,
    );
    if (errorComponent) return errorComponent;
    return (
      <ParentWrapper>
        <div className="flex min-h-[calc(100vh-100px)] items-center text-lg">
          {coffeeListingsErr?.response?.data}
        </div>
      </ParentWrapper>
    );
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
        return S3_IMAGES.ESPRESSO;
      case BrewMethod.V60:
        return S3_IMAGES.V60;
      default:
        return S3_IMAGES.ESPRESSO;
    }
  };

  const handleDelete = (listingId: string) => {
    deleteCoffeeListing(listingId, {
      onSuccess: () => {
        toast.success(COFFEE_LISTING_MESSAGE.LISTING_SUCCESSFULLY_DELETED);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.COFFEE_LISTINGS],
        });
      },
      onError: () => {
        toast.error(COFFEE_LISTING_MESSAGE.LISTING_DELETION_FAILED);
      },
    });
  };

  return (
    <ParentWrapper>
      {sortedCoffeeListings.length < 1 ? (
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
          message="No coffee listings found. Add some?"
        />
      ) : (
        <div className="grid w-full grid-cols-1 gap-8 pb-12 sm:grid-cols-2 md:w-4/5 md:py-12 lg:grid-cols-3">
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
                  <div className="absolute top-2 right-2 z-10">
                    <CTADialog
                      btn={<X color="white" />}
                      variant="ghost"
                      alertDescription="This action cannot be undone. Your listing will be permanently deleted from our servers."
                      handleDelete={() => handleDelete(listingId)}
                    />
                  </div>
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
                    <Badge variant="secondary">
                      {
                        RoastType[
                          roastType as unknown as keyof typeof RoastType
                        ]
                      }
                    </Badge>
                    <Badge variant="secondary">
                      {BrewMethod[brewMethod as keyof typeof BrewMethod]}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Roast Date
                    </p>
                    <p className="text-sm">{formatDate(new Date(roastDate))}</p>
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
