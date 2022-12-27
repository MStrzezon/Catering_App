package com.mstrzezon.restaurant.exception;

public class CartItemNotFound extends RuntimeException {

    public CartItemNotFound(Long id) {
        super("Could not find cart item " + id);
    }
}
