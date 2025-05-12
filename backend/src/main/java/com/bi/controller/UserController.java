package com.bi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bi.constant.ApiPaths;
import com.bi.constant.Authentication;
import com.bi.constant.ErrorMessage;
import com.bi.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.X_USER)
public class UserController {
    private final UserService userService;

    @GetMapping
    public String getUser(HttpSession session) {
        String user = session.getAttribute(Authentication.USER).toString();
        if (user == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ErrorMessage.UNAUTHORISED_USER);
        return user;
    }
}
