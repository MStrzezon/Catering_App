package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.model.CartItem;
import com.mstrzezon.restaurant.model.Order;
import com.mstrzezon.restaurant.model.OrderItem;
import com.mstrzezon.restaurant.service.OrderService;
import com.mstrzezon.restaurant.service.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders/{id}")
    public Set<OrderItem> getOrderItems(@PathVariable Long id) {
        return orderService.getOrderItems(id);
    }

    @GetMapping("/users/{userId}/orders")
    public Set<Order> getOrder(@PathVariable Long userId) {
        return orderService.getOrders(userId);
    }

    @PostMapping("/orders/make-order")
    public Set<OrderItem> makeAnOrder(@RequestBody List<CartItem> cartItemList) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return orderService.makeAnOrder(cartItemList, userDetails.getId());
    }
}
