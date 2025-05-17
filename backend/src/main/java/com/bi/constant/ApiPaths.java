package com.bi.constant;

public class ApiPaths {
    public static final String HEALTHCHECK = "/healthcheck";
    private static final String BASE_API = "/api/v1";
    public static final String GET_COFFEE_LISTINGS = BASE_API + "/coffee-listings";
    public static final String GET_RECIPES = BASE_API + "/recipes";
    public static final String LOGIN_WITH_X = BASE_API + "/login";
    public static final String X_CALLBACK = "/callback";
    public static final String X_AUTH_STATUS = "/status";
    public static final String X_USER = BASE_API + "/user";
    public static final String X_VERIFY_CREDENTIALS = "https://api.twitter.com/1.1/account/verify_credentials.json";
}
