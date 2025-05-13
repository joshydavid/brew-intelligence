package com.bi.service;

import com.bi.model.UserProfile;

public interface UserService {
    UserProfile getUserById(String userId);

    void insertUser(String xId, String xName);
}
