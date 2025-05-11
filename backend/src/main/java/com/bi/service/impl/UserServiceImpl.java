package com.bi.service.impl;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.bi.constant.ApiPaths;
import com.bi.service.UserService;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public String getUser(OAuth10aService service, OAuth1AccessToken accessToken)
            throws IOException, InterruptedException, ExecutionException {
        OAuthRequest request = new OAuthRequest(Verb.GET, ApiPaths.X_VERIFY_CREDENTIALS);
        service.signRequest(accessToken, request);

        Response response = service.execute(request);
        return response.getBody();
    }
}
