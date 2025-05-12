package com.bi.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bi.model.UserProfile;

public interface UserServiceRepository extends JpaRepository<UserProfile, UUID> {

}
