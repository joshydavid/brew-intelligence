package com.bi.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;
import com.bi.constant.ErrorMessage;
import com.bi.security.CustomUserPrincipal;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.X_USER)
public class UserController {
    @GetMapping(ApiPaths.X_AUTH_STATUS)
    public ResponseEntity<Map<String, String>> getUserId(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserPrincipal userPrincipal) {
                return ResponseEntity.ok(Map.of(
                        "userId", userPrincipal.getUserId(),
                        "name", userPrincipal.getName()));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", ErrorMessage.UNAUTHENTICATED_USER));
    }
}
