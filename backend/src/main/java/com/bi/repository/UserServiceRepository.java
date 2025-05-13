package com.bi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bi.model.UserProfile;

public interface UserServiceRepository extends JpaRepository<UserProfile, String> {

}
