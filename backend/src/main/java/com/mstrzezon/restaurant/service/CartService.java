package com.mstrzezon.restaurant.service;

import com.mstrzezon.restaurant.exception.CartItemNotFound;
import com.mstrzezon.restaurant.exception.CartNotFoundException;
import com.mstrzezon.restaurant.exception.DishNotFoundException;
import com.mstrzezon.restaurant.model.Cart;
import com.mstrzezon.restaurant.model.CartItem;
import com.mstrzezon.restaurant.model.Dish;
import com.mstrzezon.restaurant.repository.CartItemRepository;
import com.mstrzezon.restaurant.repository.CartRepository;
import com.mstrzezon.restaurant.repository.DishRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

import static java.util.Objects.isNull;

@Service
public class CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final DishRepository dishRepository;

    CartService(CartRepository cartRepository, DishRepository dishRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.dishRepository = dishRepository;
    }

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Integer numberOfServings(Long cartId, Long dishId) {
        return cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException(cartId)).getCartItems().stream()
                .filter(cartItem -> cartItem.getDish().getDishId().equals(dishId))
                .findFirst()
                .map(CartItem::getQuantity)
                .orElse(0);
    }

    public Set<CartItem> addDishToCart(Long cartId, Long dishId, Integer quantity) {
        Optional<Dish> optionalDish = dishRepository.findById(dishId);
        CartItem cartItem = new CartItem();
        Dish dish = optionalDish.orElseThrow(() -> new DishNotFoundException(dishId));
        dish.setQuantity(dish.getQuantity() - quantity);
        cartItem.setDish(dish);
        cartItem.setQuantity(quantity);

        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        Cart cart = optionalCart.orElse(new Cart());
        cartItem.setCart(cart);
        if (isNull(cart.getCartItems()) || cart.getCartItems().isEmpty()) {
            cart.setCartItems(new HashSet<>(Collections.singletonList(cartItem)));
        } else {
            AtomicBoolean exists = new AtomicBoolean(false);
            cart.getCartItems().stream().forEach(item -> {
                if (item.getDish().getDishId().equals(dishId)) {
                    item.setQuantity(item.getQuantity() + quantity);
                    exists.set(true);
                }
            });
            if (!exists.get()) {
                cart.getCartItems().add(cartItem);
            }
        }
        Cart savedCart = cartRepository.save(cart);
        return savedCart.getCartItems();
    }

    public void removeDishFromCart(Long cartId, Long dishId, Integer quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        Optional<CartItem> optionalCartItem = optionalCart.orElseThrow(() -> new CartNotFoundException(cartId))
                .getCartItems().stream()
                .filter(cartItem -> cartItem.getDish().getDishId().equals(dishId))
                .findFirst();
        Cart cart = optionalCart.get();
        if (optionalCartItem.isPresent()) {
            optionalCartItem.get().setQuantity(optionalCartItem.get().getQuantity() - quantity);
            if (optionalCartItem.get().getQuantity() == 0) {
                cart.getCartItems().remove(optionalCartItem.get());
                cartItemRepository.delete(cartItemRepository.findById(optionalCartItem.get().getId()).orElseThrow(() -> new CartItemNotFound(optionalCartItem.get().getId())));
            }
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new DishNotFoundException(dishId));
            dish.setQuantity(dish.getQuantity() + quantity);
            cartRepository.save(cart);
        }
    }

    public Set<CartItem> getCartItems(Long id) {
        return cartRepository.findById(id).orElseThrow(() -> new CartNotFoundException(id)).getCartItems();
    }
}
