package com.bi.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
class SwaggerConfig {
    @Value("${swagger.documentation.url}")
    private String swaggerDocUrl;

    @Bean
    OpenAPI customOpenAPI() {
        Server server = new Server();
        server.setUrl(swaggerDocUrl);
        return new OpenAPI().servers(List.of(server));
    }
}
