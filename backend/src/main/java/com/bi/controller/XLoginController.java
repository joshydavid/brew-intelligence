package com.bi.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;
import com.bi.service.XLoginService;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(ApiPaths.LOGIN_WITH_X)
public class XLoginController {
    @Value("${frontend.redirect.url}")
    private String frontendRedirectUrl;

    @Value("${cookie.secure}")
    private Boolean isCookieSecure;

    private final XLoginService xLoginService;

    public XLoginController(XLoginService xLoginService) {
        this.xLoginService = xLoginService;
    }

    @GetMapping
    public String loginWithX(HttpSession session) throws Exception {
        OAuth1RequestToken requestToken = this.xLoginService.getRequestToken();
        session.setAttribute("requestToken", requestToken);
        return this.xLoginService.getAuthorizationUrl(requestToken);
    }

    @GetMapping("/callback")
    public void callback(@RequestParam("oauth_verifier") String oAuthVerifier, HttpSession session,
            HttpServletResponse response)
            throws Exception {
        OAuth1RequestToken requestToken = (OAuth1RequestToken) session.getAttribute("requestToken");
        OAuth1AccessToken accessToken = this.xLoginService.getAccessToken(requestToken, oAuthVerifier);

        Cookie cookie = new Cookie("x_access_token", accessToken.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(isCookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60);
        response.addCookie(cookie);
        response.sendRedirect(frontendRedirectUrl);
    }
}
