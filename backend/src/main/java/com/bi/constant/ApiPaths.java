package com.bi.constant;

public class ApiPaths {
    private static final String BASE_API = "/api/v1";
    public static final String HEALTHCHECK = BASE_API + "/healthcheck";
    public static final String GET_COFFEE_LISTINGS = BASE_API + "/coffee-listings";
    public static final String GET_RECIPES = BASE_API + "/recipes";
    public static final String LOGIN_WITH_X = BASE_API + "/login";
    public static final String X_CALLBACK = "/callback";
    public static final String X_AUTH_STATUS = "/status";
    public static final String X_USER = BASE_API + "/user";
    public static final String X_VERIFY_CREDENTIALS = "https://api.twitter.com/1.1/account/verify_credentials.json";
    public static final String LLM_API = BASE_API + "/generate-content";
    private static final String[] SWAGGER_WHITELIST = {
            "/docs.html", "/swagger-ui/**", "/api-docs/**"
    };

    private ApiPaths() {
    }

    public static String[] getSwaggerWhitelist() {
        return SWAGGER_WHITELIST.clone();
    }
}
