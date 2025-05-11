package com.bi.mapper;

import com.bi.dto.CoffeeListingDTO;
import com.bi.model.CoffeeListing;

public class CoffeeListingMapper {
    public static CoffeeListingDTO toDTO(CoffeeListing entity) {
        if (entity == null)
            return null;

        return CoffeeListingDTO.builder()
                .listingId(entity.getListingId())
                .coffeeName(entity.getCoffeeName())
                .roastType((entity.getRoastType()))
                .roastDate(entity.getRoastDate())
                .weightInKg(entity.getWeightInKg())
                .brewMethod(entity.getBrewMethod())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
