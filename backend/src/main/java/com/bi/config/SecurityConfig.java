package com.bi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.bi.constant.ApiPaths;
import com.bi.constant.ErrorMessage;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(ApiPaths.HEALTHCHECK).permitAll()
                        .requestMatchers(ApiPaths.LOGIN_WITH_X + "/**").permitAll()
                        .requestMatchers(ApiPaths.getSwaggerWhitelist()).permitAll()
                        .anyRequest()
                        .authenticated())
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> response
                                .sendError(HttpServletResponse.SC_UNAUTHORIZED, ErrorMessage.UNAUTHENTICATED_USER)));

        return http.build();
    }
}
