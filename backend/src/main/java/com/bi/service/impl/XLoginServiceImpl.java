package com.bi.service.impl;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bi.constant.ApiPaths;
import com.bi.constant.Authentication;
import com.bi.service.XLoginService;
import com.github.scribejava.apis.TwitterApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Service
public class XLoginServiceImpl implements XLoginService {
    @Value("${frontend.redirect.url}")
    private String frontendRedirectUrl;

    @Value("${cookie.secure}")
    private Boolean isCookieSecure;

    private final OAuth10aService service;

    public XLoginServiceImpl(
            @Value("${x.api.key}") String apiKey,
            @Value("${x.api.secret}") String apiSecret,
            @Value("${x.callback.url}") String callbackUrl) {

        this.service = new ServiceBuilder(apiKey)
                .apiSecret(apiSecret)
                .callback(callbackUrl)
                .build(TwitterApi.instance());
    }

    @Override
    public OAuth10aService getService() {
        return this.service;
    }

    @Override
    public OAuth1RequestToken getRequestToken() throws IOException,
            ExecutionException, InterruptedException {
        return this.service.getRequestToken();
    }

    @Override
    public String getAuthorizationUrl(OAuth1RequestToken requestToken) {
        return this.service.getAuthorizationUrl(requestToken);
    }

    @Override
    public OAuth1AccessToken getAccessToken(OAuth1RequestToken requestToken,
            String oAuthVerifier)
            throws IOException, ExecutionException, InterruptedException {
        return this.service.getAccessToken(requestToken, oAuthVerifier);
    }

    @Override
    public void handleCallback(OAuth1RequestToken requestToken,
            String oAuthVerifier,
            HttpSession session,
            HttpServletResponse response, OAuth1AccessToken accessToken) throws Exception {

        Cookie cookie = new Cookie(Authentication.X_ACCESS_TOKEN, accessToken.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(isCookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60);
        response.addCookie(cookie);

        String userProfile = this.getUser(service, accessToken);
        session.setAttribute(Authentication.USER, userProfile);
        response.sendRedirect(frontendRedirectUrl);
    }

    @Override
    public String getUser(OAuth10aService service, OAuth1AccessToken accessToken)
            throws IOException, InterruptedException, ExecutionException {
        OAuthRequest request = new OAuthRequest(Verb.GET, ApiPaths.X_VERIFY_CREDENTIALS);
        service.signRequest(accessToken, request);

        Response response = service.execute(request);
        return response.getBody();
    }
}
