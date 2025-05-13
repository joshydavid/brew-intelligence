package com.bi.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.bi.constant.RedisCacheKey;
import com.bi.dto.AddOrUpdateCoffeeListingDTO;
import com.bi.dto.CoffeeListingDTO;
import com.bi.exception.EntityNotFoundException;
import com.bi.mapper.CoffeeListingMapper;
import com.bi.model.CoffeeListing;
import com.bi.model.UserProfile;
import com.bi.model.enums.RoastType;
import com.bi.repository.CoffeeListingRepository;
import com.bi.service.CoffeeListingService;
import com.bi.service.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CoffeeListingServiceImpl implements CoffeeListingService {
    private final CoffeeListingRepository coffeeListingRepo;
    private final UserService userService;

    @Override
    @Cacheable(value = RedisCacheKey.GET_COFFEE_LISTINGS_KEY)
    public List<CoffeeListingDTO> getCoffeeListings() {
        List<CoffeeListing> coffeeListings = this.coffeeListingRepo.findAll();
        return coffeeListings.stream()
                .map(CoffeeListingMapper::toDTO)
                .toList();
    }

    @Override
    @Cacheable(value = RedisCacheKey.GET_FILTERED_COFFEE_LISTINGS_KEY)
    public List<CoffeeListingDTO> getCoffeeListingsByRoastType(RoastType roastType) {
        List<CoffeeListing> filteredCoffeeListings = this.coffeeListingRepo.findByRoastType(roastType);
        return filteredCoffeeListings.stream()
                .map(CoffeeListingMapper::toDTO)
                .toList();
    }

    @Override
    @CacheEvict(value = { RedisCacheKey.GET_COFFEE_LISTINGS_KEY,
            RedisCacheKey.GET_FILTERED_COFFEE_LISTINGS_KEY }, allEntries = true)
    @Transactional
    public CoffeeListingDTO addCoffeeListing(AddOrUpdateCoffeeListingDTO dto) {
        String userId = dto.getUserId();
        UserProfile userProfile = this.userService.getUserById(userId);

        CoffeeListing coffeeListing = CoffeeListing.builder()
                .userProfile(userProfile)
                .coffeeName(dto.getCoffeeName())
                .roastDate(dto.getRoastDate())
                .weightInKg(dto.getWeightInKg())
                .roastType(dto.getRoastType())
                .brewMethod(dto.getBrewMethod())
                .build();

        CoffeeListing newCoffeeListing = coffeeListingRepo.save(coffeeListing);
        return CoffeeListingMapper.toDTO(newCoffeeListing);
    }

    @Override
    @CacheEvict(value = { RedisCacheKey.GET_COFFEE_LISTINGS_KEY,
            RedisCacheKey.GET_FILTERED_COFFEE_LISTINGS_KEY }, allEntries = true)
    @Transactional
    public CoffeeListingDTO updateCoffeeListing(UUID id, AddOrUpdateCoffeeListingDTO updatedCoffeeListing) {
        // TODO: Refactor error code
        CoffeeListing existingListing = this.coffeeListingRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CoffeeListing", id));

        existingListing.setCoffeeName(updatedCoffeeListing.getCoffeeName());
        existingListing.setRoastType(updatedCoffeeListing.getRoastType());
        existingListing.setRoastDate(updatedCoffeeListing.getRoastDate());
        existingListing.setWeightInKg(updatedCoffeeListing.getWeightInKg());
        existingListing.setBrewMethod(updatedCoffeeListing.getBrewMethod());

        CoffeeListing updatedListing = this.coffeeListingRepo.save(existingListing);
        return CoffeeListingMapper.toDTO(updatedListing);
    }
}
