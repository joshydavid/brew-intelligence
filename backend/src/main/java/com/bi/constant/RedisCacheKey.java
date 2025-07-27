package com.bi.constant;

public class RedisCacheKey {
    private RedisCacheKey() {

    }

    public static final String CACHE_PARAM = "#userId";
    public static final String GET_COFFEE_LISTINGS_KEY = "getCoffeeListings";
    public static final String GET_USER_COFFEE_LISTINGS_KEY = "getUserCoffeeListings";
    public static final String GET_FILTERED_COFFEE_LISTINGS_KEY = "getFilteredCoffeeListings";
    public static final String GET_RECIPES_KEY = "getRecipe";
    public static final String GET_USER_RECIPES_KEY = "getUserRecipe";
}
