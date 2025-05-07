package com.bi.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bi.model.CoffeeListing;
import com.bi.model.enums.RoastType;

public interface CoffeeListingRepository extends JpaRepository<CoffeeListing, UUID> {
    List<CoffeeListing> findByRoastType(RoastType roastType);
}
