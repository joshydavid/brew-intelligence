package com.bi.service.impl;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bi.service.XLoginService;
import com.github.scribejava.apis.TwitterApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.oauth.OAuth10aService;

@Service
public class XLoginServiceImpl implements XLoginService {
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
}
