package com.bi.service;

import java.util.List;
import java.util.UUID;

import com.bi.dto.AddCoffeeListingDTO;
import com.bi.dto.CoffeeListingDTO;
import com.bi.model.enums.RoastType;

public interface CoffeeListingService {
    List<CoffeeListingDTO> getCoffeeListings();

    List<CoffeeListingDTO> getCoffeeListingsByRoastType(RoastType roastType);

    CoffeeListingDTO addCoffeeListing(AddCoffeeListingDTO dto);

    CoffeeListingDTO updateCoffeeListing(UUID id, AddCoffeeListingDTO dto);
}
