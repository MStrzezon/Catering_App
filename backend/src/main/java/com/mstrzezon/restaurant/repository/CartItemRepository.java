package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
