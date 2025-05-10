package com.bi.service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.oauth.OAuth10aService;

public interface XLoginService {
    OAuth10aService getService();

    OAuth1RequestToken getRequestToken() throws IOException, ExecutionException, InterruptedException;

    String getAuthorizationUrl(OAuth1RequestToken requestToken);

    OAuth1AccessToken getAccessToken(OAuth1RequestToken requestToken, String oAuthVerifier)
            throws IOException, ExecutionException, InterruptedException;
}
