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
import com.bi.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.X_USER)
public class UserController {
    private final UserService userService;

    // TODO: refactor
    // @GetMapping
    // public String getUser(HttpSession session) {
    // String user = session.getAttribute(Auth.USER).toString();
    // if (user == null)
    // throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
    // ErrorMessage.UNAUTHORISED_USER);
    // return user;
    // }

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
