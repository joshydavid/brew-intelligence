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
import com.bi.dto.AddRecipeDTO;
import com.bi.dto.RecipeDTO;
import com.bi.service.RecipeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(ApiPaths.GET_RECIPES)
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<RecipeDTO> getRecipes() {
        return this.recipeService.getRecipes();
    }

    @PostMapping
    public ResponseEntity<RecipeDTO> addRecipe(@Valid @RequestBody AddRecipeDTO dto) {
        RecipeDTO createdRecipe = this.recipeService.addRecipe(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable UUID id,
            @RequestBody RecipeDTO recipeDTO) {
        RecipeDTO updatedRecipe = this.recipeService.updateRecipe(id, recipeDTO);
        return ResponseEntity.ok(updatedRecipe);
    }

}
