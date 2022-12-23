package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.exception.CartNotFoundException;
import com.mstrzezon.restaurant.model.Cart;
import com.mstrzezon.restaurant.model.CartItem;
import com.mstrzezon.restaurant.repository.CartRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {

    private CartRepository repository;

    CartController(CartRepository cartRepository) {
        this.repository = cartRepository;
    }

    @GetMapping("/carts/{id}")
    Cart cart(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new CartNotFoundException(id));
    }

    @PostMapping("/carts")
    Cart newCart(@RequestBody Cart newCart) {
        return repository.save(newCart);
    }

    @PostMapping("/carts/{id}/add-item")
    Cart addCartItem(@PathVariable Long id, @RequestParam CartItem cartItem) {
        return repository.findById(id)
                .map(cart -> {
                    cart.getCartItems().add(cartItem);
                    cart.setCartItems(cart.getCartItems());
                    return repository.save(cart);
                })
                .orElseThrow(() -> new CartNotFoundException(id));
    }
}
