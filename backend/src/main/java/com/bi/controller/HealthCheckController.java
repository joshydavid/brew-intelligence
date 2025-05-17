package com.bi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;

@RestController
public class HealthCheckController {
    @GetMapping(ApiPaths.HEALTHCHECK)
    public String isHealthOK() {
        return "OK";
    }
}
