package com.bi.service.impl;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.bi.constant.ApiPaths;
import com.bi.constant.ErrorMessage;
import com.bi.model.UserProfile;
import com.bi.repository.UserServiceRepository;
import com.bi.service.UserService;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserServiceRepository userServiceRepository;

    @Override
    public String getUser(OAuth10aService service, OAuth1AccessToken accessToken)
            throws IOException, InterruptedException, ExecutionException {
        OAuthRequest request = new OAuthRequest(Verb.GET, ApiPaths.X_VERIFY_CREDENTIALS);
        service.signRequest(accessToken, request);

        Response response = service.execute(request);
        return response.getBody();
    }

    @Override
    public UserProfile getUserById(UUID userId) {
        return userServiceRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(ErrorMessage.USER_DOES_NOT_EXIST + " " + userId));
    }
}
