package com.bi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BrewintelligenceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BrewintelligenceApplication.class, args);
    }
}
