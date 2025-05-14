package com.bi.service;

import java.util.List;
import java.util.UUID;

import com.bi.dto.AddOrUpdateCoffeeListingDTO;
import com.bi.dto.CoffeeListingDTO;
import com.bi.model.enums.RoastType;

public interface CoffeeListingService {
    List<CoffeeListingDTO> getCoffeeListings();

    List<CoffeeListingDTO> getCoffeeListingsByUserId(String userId);

    List<CoffeeListingDTO> getCoffeeListingsByRoastType(RoastType roastType);

    CoffeeListingDTO addCoffeeListing(AddOrUpdateCoffeeListingDTO dto);

    CoffeeListingDTO updateCoffeeListing(UUID id, AddOrUpdateCoffeeListingDTO dto);
}
