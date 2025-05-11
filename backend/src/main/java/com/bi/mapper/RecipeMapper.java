package com.bi.mapper;

import com.bi.dto.RecipeDTO;
import com.bi.model.Recipe;

public class RecipeMapper {
    public static RecipeDTO toDTO(Recipe entity) {
        if (entity == null)
            return null;

        return RecipeDTO.builder()
                .recipeId(entity.getRecipeId())
                .methodType(entity.getMethodType())
                .coffeeDose(entity.getCoffeeDose())
                .waterAmount(entity.getWaterAmount())
                .brewTemp(entity.getBrewTemp())
                .brewTime(entity.getBrewTime())
                .brewInstructions(entity.getBrewInstructions())
                .createdBy(entity.getCreatedBy())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
