package com.bi.service;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import com.bi.model.UserProfile;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.oauth.OAuth10aService;

public interface UserService {
    String getUser(OAuth10aService service, OAuth1AccessToken accessToken)
            throws IOException, InterruptedException, ExecutionException;

    UserProfile getUserById(UUID userId);
}
