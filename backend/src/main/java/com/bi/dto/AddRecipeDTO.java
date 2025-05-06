package com.bi.dto;

import java.util.List;

import com.bi.model.enums.MethodType;

import lombok.Data;

@Data
public class AddRecipeDTO {
    private MethodType methodType;
    private double coffeeDose;
    private double waterAmount;
    private int brewTemp;
    private String brewTime;
    private List<String> brewInstructions;
    private String createdBy;
}
