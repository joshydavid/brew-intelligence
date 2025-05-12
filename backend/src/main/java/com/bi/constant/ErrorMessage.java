package com.bi.constant;

public class ErrorMessage {
    // Authentication
    public static final String UNAUTHORISED_USER = "User is unauthorised. Please login.";
    public static final String USER_ID_REQUIRED = "UserId cannot be null";
    public static final String USER_DOES_NOT_EXIST = "User does not exist";

    // Rate Limiting
    public static final String TOO_MANY_REQUESTS = "Too many requests. Please try again later.";

    // AddOrUpdateCoffeeListingDTO
    public static final String COFFEE_NAME_REQUIRED = "Coffee name is required";
    public static final String ROAST_DATE_REQUIRED = "Roast date is required";
    public static final String NO_FUTURE_DATE = "Date cannot be in the future";
    public static final String WEIGHT_REQUIRED = "Weight is required";
    public static final String POSITIVE_ONLY = "Number should never be zero or negative";
    public static final String ROAST_TYPE_REQUIRED = "Roast type is required";
    public static final String BREW_METHOD_REQUIRED = "Brew method is required";

    // AddOrUpdateRecipeDTO
    public static final String METHOD_TYPE_REQUIRED = "Method type is required";
    public static final String COFFEE_DOSE_REQUIRED = "Coffee dose is required";
    public static final String WATER_AMOUNT_REQUIRED = "Water amount is required";
    public static final String BREW_TEMP_REQUIRED = "Brew temperature is required";
    public static final String BREW_TIME_REQUIRED = "Brew time is required";
    public static final String BREW_INSTRUCTIONS_REQUIRED = "Brew instructions are required";
    public static final String CREATED_BY_REQUIRED = "Creator's name is required";
}
