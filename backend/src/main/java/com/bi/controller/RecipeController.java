package com.bi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;
import com.bi.dto.RecipeDTO;
import com.bi.service.RecipeService;

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

}
