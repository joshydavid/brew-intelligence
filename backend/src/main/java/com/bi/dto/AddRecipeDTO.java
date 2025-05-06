package com.bi.dto;

import java.util.List;

import com.bi.constant.ErrorMessage;
import com.bi.model.enums.MethodType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddRecipeDTO {
    @NotNull(message = ErrorMessage.METHOD_TYPE_REQUIRED)
    private MethodType methodType;

    @NotNull(message = ErrorMessage.COFFEE_DOSE_REQUIRED)
    private double coffeeDose;

    @NotNull(message = ErrorMessage.WATER_AMOUNT_REQUIRED)
    private double waterAmount;

    @NotNull(message = ErrorMessage.BREW_TEMP_REQUIRED)
    private int brewTemp;

    @NotBlank(message = ErrorMessage.BREW_TIME_REQUIRED)
    private String brewTime;

    @NotNull(message = ErrorMessage.BREW_INSTRUCTIONS_REQUIRED)
    private List<String> brewInstructions;

    @NotBlank(message = ErrorMessage.CREATED_BY_REQUIRED)
    private String createdBy;
}
