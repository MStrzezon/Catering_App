package com.mstrzezon.restaurant.exception;

public class DishNotFoundException extends RuntimeException {

    public DishNotFoundException(Long id) {
        super("Could not find employee " + id);
    }
}
