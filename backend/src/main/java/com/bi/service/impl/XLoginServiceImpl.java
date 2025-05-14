package com.bi.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bi.constant.ApiPaths;
import com.bi.constant.Auth;
import com.bi.service.UserService;
import com.bi.service.XLoginService;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class XLoginServiceImpl implements XLoginService {
    @Value("${frontend.redirect.url}")
    private String frontendRedirectUrl;

    @Value("${cookie.secure}")
    private Boolean isCookieSecure;

    private final OAuth10aService service;
    private final UserService userService;

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

        Cookie cookie = new Cookie(Auth.X_ACCESS_TOKEN, accessToken.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(isCookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60);
        response.addCookie(cookie);

        this.authenticateUser(session, accessToken);
        response.sendRedirect(frontendRedirectUrl);
    }

    private void authenticateUser(HttpSession session, OAuth1AccessToken accessToken)
            throws IOException, InterruptedException, ExecutionException {

        OAuthRequest request = new OAuthRequest(Verb.GET, ApiPaths.X_VERIFY_CREDENTIALS);
        service.signRequest(accessToken, request);

        Response userProfile = service.execute(request);
        JSONObject userProfileSanitised = new JSONObject(userProfile.getBody());

        String xId = userProfileSanitised.getString("id_str");
        String xName = userProfileSanitised.getString("name");
        this.userService.insertUser(xId, xName);

        session.setAttribute(Auth.X_ACCESS_TOKEN, accessToken);
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                xId, null, List.of());

        SecurityContextHolder.getContext().setAuthentication(authToken);
        session.setAttribute(Auth.SPRING_SECURITY_CONTEXT, SecurityContextHolder.getContext());
    }

}
