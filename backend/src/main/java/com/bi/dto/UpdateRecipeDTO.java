package com.bi.dto;

import java.util.List;
import java.util.UUID;

import com.bi.model.enums.MethodType;

import lombok.Data;

@Data

public class UpdateRecipeDTO {
    private UUID recipeId;
    private MethodType methodType;
    private double coffeeDose;
    private double waterAmount;
    private int brewTemp;
    private String brewTime;
    private List<String> brewInstructions;
    private String createdBy;
}
