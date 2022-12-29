package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
