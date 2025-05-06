package com.bi.service.impl;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.bi.constant.RedisCacheKey;
import com.bi.dto.RecipeDTO;
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

    @Cacheable(value = RedisCacheKey.GET_RECIPES_KEY)
    public List<RecipeDTO> getRecipes() {
        List<Recipe> recipes = recipeRepo.findAll();
        return recipes.stream()
                .map(RecipeMapper::toDTO)
                .toList();
    }
}
