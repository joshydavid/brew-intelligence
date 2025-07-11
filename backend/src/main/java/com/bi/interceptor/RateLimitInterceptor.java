package com.bi.interceptor;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.bi.config.RateLimitConfig;
import com.bi.constant.ErrorMessage;

import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RateLimitInterceptor implements HandlerInterceptor {
    private final Map<String, Bucket> buckets;
    private final RateLimitConfig rateLimitConfig;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String sessionId = request.getSession(true).getId();
        Bucket bucket = buckets.computeIfAbsent(sessionId, k -> rateLimitConfig.createBucket());
        if (bucket.tryConsume(1)) {
            return true;
        }
        response.setStatus(429);
        response.getWriter().write(ErrorMessage.TOO_MANY_REQUESTS);
        return false;
    }
}
