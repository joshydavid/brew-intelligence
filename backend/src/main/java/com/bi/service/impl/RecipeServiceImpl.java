package com.bi.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.bi.constant.RedisCacheKey;
import com.bi.dto.AddRecipeDTO;
import com.bi.dto.RecipeDTO;
import com.bi.exception.EntityNotFoundException;
import com.bi.mapper.RecipeMapper;
import com.bi.model.Recipe;
import com.bi.repository.RecipeRepository;
import com.bi.service.RecipeService;

@Service
public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepo;

    public RecipeServiceImpl(RecipeRepository recipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    @Override
    @Cacheable(value = RedisCacheKey.GET_RECIPES_KEY)
    public List<RecipeDTO> getRecipes() {
        List<Recipe> recipes = this.recipeRepo.findAll();
        return recipes.stream()
                .map(RecipeMapper::toDTO)
                .toList();
    }

    @Override
    @CacheEvict(value = RedisCacheKey.GET_RECIPES_KEY, allEntries = true)
    public RecipeDTO addRecipe(AddRecipeDTO dto) {
        Recipe newRecipe = Recipe.builder()
                .methodType(dto.getMethodType())
                .coffeeDose(dto.getCoffeeDose())
                .waterAmount(dto.getWaterAmount())
                .brewTemp(dto.getBrewTemp())
                .brewTime(dto.getBrewTime())
                .brewInstructions(dto.getBrewInstructions())
                .createdBy(dto.getCreatedBy())
                .build();

        Recipe newRecipeDTO = this.recipeRepo.save(newRecipe);
        return RecipeMapper.toDTO(newRecipeDTO);
    }

    @Override
    @CacheEvict(value = RedisCacheKey.GET_RECIPES_KEY, allEntries = true)
    public RecipeDTO updateRecipe(UUID id, AddRecipeDTO updatedRecipe) {
        Recipe existingRecipe = this.recipeRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe", id));

        existingRecipe.setMethodType(updatedRecipe.getMethodType());
        existingRecipe.setCoffeeDose(updatedRecipe.getCoffeeDose());
        existingRecipe.setWaterAmount(updatedRecipe.getWaterAmount());
        existingRecipe.setBrewTemp(updatedRecipe.getBrewTemp());
        existingRecipe.setBrewTime(updatedRecipe.getBrewTime());
        existingRecipe.setBrewInstructions(updatedRecipe.getBrewInstructions());
        existingRecipe.setCreatedBy(updatedRecipe.getCreatedBy());

        Recipe savedRecipe = recipeRepo.save(existingRecipe);
        return RecipeMapper.toDTO(savedRecipe);
    }

}
