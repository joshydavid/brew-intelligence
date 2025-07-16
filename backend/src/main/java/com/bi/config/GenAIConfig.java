package com.bi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.genai.Client;

@Configuration
public class GenAIConfig {
    @Value("${genai.api.key}")
    private String apiKey;

    @Bean
    Client client() {
        return new Client.Builder()
                .apiKey(apiKey)
                .build();
    }
}
