package com.bi.config;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;

@Configuration
public class RateLimitConfig {
    @Value("${num.reqs.per.min}")
    private Long NUM_REQUESTS_PER_MIN;

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Bean
    Map<String, Bucket> buckets() {
        return buckets;
    }

    public Bucket createBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(NUM_REQUESTS_PER_MIN)
                .refillIntervally(NUM_REQUESTS_PER_MIN, Duration.ofMinutes(1))
                .build();

        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
