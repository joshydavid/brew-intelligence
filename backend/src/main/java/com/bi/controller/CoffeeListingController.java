package com.bi.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;
import com.bi.dto.AddCoffeeListingDTO;
import com.bi.dto.CoffeeListingDTO;
import com.bi.model.enums.RoastType;
import com.bi.service.CoffeeListingService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping(ApiPaths.GET_COFFEE_LISTINGS)
@Tag(name = "Coffee Listings", description = "APIs for listing coffee")
public class CoffeeListingController {

    private final CoffeeListingService coffeeListingService;

    public CoffeeListingController(CoffeeListingService coffeeListingService) {
        this.coffeeListingService = coffeeListingService;
    }

    @GetMapping
    public ResponseEntity<List<CoffeeListingDTO>> getCoffeeListings() {
        List<CoffeeListingDTO> coffeeListings = this.coffeeListingService.getCoffeeListings();
        return ResponseEntity.ok(coffeeListings);
    }

    // TODO: Refactor this to make it scalable
    @GetMapping("/filter")
    public ResponseEntity<List<CoffeeListingDTO>> getCoffeeListingsByRoastType(
            @RequestParam("roastType") String roastType) {
        RoastType roastTypeEnum = RoastType.valueOf(roastType.toUpperCase());
        List<CoffeeListingDTO> coffeeListings = this.coffeeListingService.getCoffeeListingsByRoastType(roastTypeEnum);
        return ResponseEntity.ok(coffeeListings);
    }

    @PostMapping
    public ResponseEntity<CoffeeListingDTO> addCoffeeListing(@Valid @RequestBody AddCoffeeListingDTO dto) {
        CoffeeListingDTO createdListing = this.coffeeListingService.addCoffeeListing(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdListing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoffeeListingDTO> updateCoffeeListing(@PathVariable UUID id,
            @Valid @RequestBody AddCoffeeListingDTO coffeeListingDTO) {
        CoffeeListingDTO updatedCoffeeListing = this.coffeeListingService.updateCoffeeListing(id, coffeeListingDTO);
        return ResponseEntity.ok(updatedCoffeeListing);
    }
}
