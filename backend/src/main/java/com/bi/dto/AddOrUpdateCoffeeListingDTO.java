package com.bi.dto;

import java.util.Date;

import com.bi.constant.ErrorMessage;
import com.bi.model.enums.BrewMethod;
import com.bi.model.enums.RoastType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class AddOrUpdateCoffeeListingDTO {
    @NotNull(message = ErrorMessage.USER_ID_REQUIRED)
    private String userId;

    @NotBlank(message = ErrorMessage.COFFEE_NAME_REQUIRED)
    private String coffeeName;

    @NotNull(message = ErrorMessage.ROAST_DATE_REQUIRED)
    @PastOrPresent(message = ErrorMessage.NO_FUTURE_DATE)
    private Date roastDate;

    @NotNull(message = ErrorMessage.WEIGHT_REQUIRED)
    @Positive(message = ErrorMessage.POSITIVE_ONLY)
    private Integer weightInKg;

    @NotNull(message = ErrorMessage.ROAST_TYPE_REQUIRED)
    private RoastType roastType;

    @NotNull(message = ErrorMessage.BREW_METHOD_REQUIRED)
    private BrewMethod brewMethod;
}
