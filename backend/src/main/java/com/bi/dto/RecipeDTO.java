package com.bi.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.bi.model.enums.MethodType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeDTO implements Serializable {
    private UUID recipeId;
    private MethodType methodType;
    private double coffeeDose;
    private double waterAmount;
    private int brewTemp;
    private String brewTime;
    private List<String> brewInstructions;
    private String createdBy;
    private Date createdAt;
}
