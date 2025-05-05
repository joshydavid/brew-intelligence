package com.bi.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bi.model.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, UUID> {

}
