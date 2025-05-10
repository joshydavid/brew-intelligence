package com.bi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bi.constant.ApiPaths;
import com.bi.constant.Authentication;
import com.bi.constant.ErrorMessage;
import com.bi.service.XLoginService;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(ApiPaths.LOGIN_WITH_X)
public class XLoginController {
    private final XLoginService xLoginService;

    public XLoginController(XLoginService xLoginService) {
        this.xLoginService = xLoginService;
    }

    @GetMapping
    public String loginWithX(HttpSession session) throws Exception {
        OAuth1RequestToken requestToken = this.xLoginService.getRequestToken();
        session.setAttribute(Authentication.REQUEST_TOKEN, requestToken);
        return this.xLoginService.getAuthorizationUrl(requestToken);
    }

    @GetMapping(ApiPaths.X_CALLBACK)
    public void callback(@RequestParam("oauth_verifier") String oAuthVerifier, HttpSession session,
            HttpServletResponse response)
            throws Exception {
        OAuth1RequestToken requestToken = (OAuth1RequestToken) session.getAttribute(Authentication.REQUEST_TOKEN);
        OAuth1AccessToken accessToken = this.xLoginService.getAccessToken(requestToken, oAuthVerifier);
        this.xLoginService.handleCallback(requestToken, oAuthVerifier, session, response, accessToken);
    }

    @GetMapping(ApiPaths.X_USER)
    public String getLoggedInUser(HttpSession session) {
        String user = session.getAttribute(Authentication.USER).toString();
        if (user == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ErrorMessage.UNAUTHORISED_USER);
        return user;
    }
}
