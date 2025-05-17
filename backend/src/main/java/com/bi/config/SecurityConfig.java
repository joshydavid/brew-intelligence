package com.bi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.bi.constant.ApiPaths;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(ApiPaths.HEALTHCHECK).permitAll()
                        .requestMatchers(ApiPaths.LOGIN_WITH_X).permitAll()
                        .requestMatchers(ApiPaths.LOGIN_WITH_X + ApiPaths.X_CALLBACK).permitAll()
                        .anyRequest()
                        .authenticated());

        return http.build();
    }
}
