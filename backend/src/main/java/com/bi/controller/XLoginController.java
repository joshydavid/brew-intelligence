package com.bi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;
import com.bi.constant.Auth;
import com.bi.service.XLoginService;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.LOGIN_WITH_X)
public class XLoginController {
    private final XLoginService xLoginService;

    @GetMapping
    public String loginWithX(HttpSession session) throws Exception {
        OAuth1RequestToken requestToken = this.xLoginService.getRequestToken();
        session.setAttribute(Auth.REQUEST_TOKEN, requestToken);
        return this.xLoginService.getAuthorizationUrl(requestToken);
    }

    @GetMapping(ApiPaths.X_CALLBACK)
    public void callback(@RequestParam("oauth_verifier") String oAuthVerifier, HttpSession session,
            HttpServletResponse response)
            throws Exception {
        OAuth1RequestToken requestToken = (OAuth1RequestToken) session.getAttribute(Auth.REQUEST_TOKEN);
        OAuth1AccessToken accessToken = this.xLoginService.getAccessToken(requestToken, oAuthVerifier);
        this.xLoginService.handleCallback(requestToken, oAuthVerifier, session, response, accessToken);
    }
}
