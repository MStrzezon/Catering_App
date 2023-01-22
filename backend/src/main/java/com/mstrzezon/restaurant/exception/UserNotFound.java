package com.mstrzezon.restaurant.exception;

public class UserNotFound extends RuntimeException {

    public UserNotFound(Long id) {
        super("Could not find user " + id);
    }
}
