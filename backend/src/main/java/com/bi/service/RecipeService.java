
package com.bi.service;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.bi.constant.RedisCacheKey;
import com.bi.dto.RecipeDTO;
import com.bi.mapper.RecipeMapper;
import com.bi.model.Recipe;
import com.bi.repository.RecipeRepository;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepo;

    public RecipeService(RecipeRepository recipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    @Cacheable(value = RedisCacheKey.GET_RECIPE_KEY)
    public List<RecipeDTO> getRecipes() {
        List<Recipe> recipe = recipeRepo.findAll();
        return recipe.stream()
                .map(RecipeMapper::toDTO)
                .toList();
    }

}
