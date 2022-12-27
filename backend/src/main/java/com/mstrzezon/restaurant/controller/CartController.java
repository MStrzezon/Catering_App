package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.model.Cart;
import com.mstrzezon.restaurant.model.CartItem;
import com.mstrzezon.restaurant.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class CartController {

    private final CartService cartService;

    CartController(CartService cartService) {
        this.cartService = cartService;
    }
    @GetMapping("/carts/{id}/items")
    Set<CartItem> getCartItems(@PathVariable Long id) {
        return cartService.getCartItems(id);
    }

    @GetMapping("carts/{id}/number-of-servings")
    Integer numberOfServings(@PathVariable Long id, @RequestParam Long dishId) {
        return cartService.numberOfServings(id, dishId);
    }

    @PostMapping("/carts")
    Cart newCart(@RequestBody Cart newCart) {
        return cartService.createCart(newCart);
    }

    @PostMapping("/carts/{id}/add-item")
    Set<CartItem> addCartItem(@PathVariable Long id, @RequestParam Long dishId, @RequestParam Integer quantity) {
        return cartService.addDishToCart(id, dishId, quantity);
    }

    @PostMapping("/carts/{id}/remove-item")
    void removeCartItem(@PathVariable Long id, @RequestParam Long dishId, @RequestParam Integer quantity) {
        cartService.removeDishFromCart(id, dishId, quantity);
    }
}
