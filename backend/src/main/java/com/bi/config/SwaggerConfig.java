package com.bi.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.bi.constant.ApiPaths;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        Server server = new Server();
        server.setUrl(ApiPaths.SWAGGER_API_URL);
        server.setDescription("Production Server");
        return new OpenAPI().servers(List.of(server));
    }
}
