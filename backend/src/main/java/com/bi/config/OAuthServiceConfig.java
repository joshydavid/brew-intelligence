package com.bi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.scribejava.apis.TwitterApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth10aService;

@Configuration
class OAuthServiceConfig {
    @Value("${x.api.key}")
    private String apiKey;

    @Value("${x.api.secret}")
    private String apiSecret;

    @Value("${x.callback.url}")
    private String callbackUrl;

    @Bean
    OAuth10aService xOAuthService() {
        return new ServiceBuilder(apiKey)
                .apiSecret(apiSecret)
                .callback(callbackUrl)
                .build(TwitterApi.instance());
    }
}
