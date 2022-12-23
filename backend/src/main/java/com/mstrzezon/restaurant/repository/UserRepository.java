package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
