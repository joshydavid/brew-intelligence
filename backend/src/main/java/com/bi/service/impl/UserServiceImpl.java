package com.bi.service.impl;

import org.springframework.stereotype.Service;

import com.bi.constant.ErrorMessage;
import com.bi.model.UserProfile;
import com.bi.repository.UserServiceRepository;
import com.bi.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserServiceRepository userServiceRepository;

    @Override
    public UserProfile getUserById(String userId) {
        return userServiceRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(ErrorMessage.USER_DOES_NOT_EXIST + " " + userId));
    }

    @Override
    public void insertUser(String xId, String xName) {
        boolean userExist = this.userServiceRepository.existsById(xId);
        if (!userExist) {
            UserProfile newUser = UserProfile.builder()
                    .userId(xId)
                    .name(xName)
                    .build();
            this.userServiceRepository.save(newUser);
        }
    }
}
