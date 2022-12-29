package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
