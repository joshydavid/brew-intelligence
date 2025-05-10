package com.bi.service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.oauth.OAuth10aService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public interface XLoginService {
    OAuth10aService getService();

    OAuth1RequestToken getRequestToken() throws IOException, ExecutionException, InterruptedException;

    String getAuthorizationUrl(OAuth1RequestToken requestToken);

    OAuth1AccessToken getAccessToken(OAuth1RequestToken requestToken, String oAuthVerifier)
            throws IOException, ExecutionException, InterruptedException;

    public void handleCallback(OAuth1RequestToken requestToken,
            String oAuthVerifier,
            HttpSession session,
            HttpServletResponse response, OAuth1AccessToken accessToken) throws Exception;

    public String getUser(OAuth10aService service, OAuth1AccessToken accessToken)
            throws IOException, InterruptedException, ExecutionException;
}
