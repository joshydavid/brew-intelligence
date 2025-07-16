package com.bi.mapper;

import com.bi.dto.RecipeDTO;
import com.bi.model.Recipe;
import com.bi.model.UserProfile;

public class RecipeMapper {
    private RecipeMapper() {

    }

    public static RecipeDTO toDTO(Recipe entity) {
        if (entity == null)
            return null;

        UserProfile userProfile = entity.getUserProfile();

        return RecipeDTO.builder()
                .recipeId(entity.getRecipeId())
                .userId(userProfile.getUserId())
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
