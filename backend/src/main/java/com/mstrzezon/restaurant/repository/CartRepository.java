package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
