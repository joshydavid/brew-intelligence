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
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;
import com.bi.dto.AddOrUpdateRecipeDTO;
import com.bi.dto.RecipeDTO;
import com.bi.service.RecipeService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.GET_RECIPES)
@Tag(name = "Recipes Listings", description = "APIs for listing recipes")
public class RecipeController {
    private final RecipeService recipeService;

    @GetMapping
    public List<RecipeDTO> getRecipes() {
        return this.recipeService.getRecipes();
    }

    @PostMapping
    public ResponseEntity<RecipeDTO> addRecipe(@Valid @RequestBody AddOrUpdateRecipeDTO dto) {
        RecipeDTO createdRecipe = this.recipeService.addRecipe(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable UUID id,
            @Valid @RequestBody AddOrUpdateRecipeDTO recipeDTO) {
        RecipeDTO updatedRecipe = this.recipeService.updateRecipe(id, recipeDTO);
        return ResponseEntity.ok(updatedRecipe);
    }

}
