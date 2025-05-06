
package com.bi.service;

import java.util.List;
import java.util.UUID;

import com.bi.dto.RecipeDTO;

public interface RecipeService {
    List<RecipeDTO> getRecipes();

    RecipeDTO updateRecipe(UUID id, RecipeDTO updatedRecipe);
}
