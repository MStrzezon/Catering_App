package com.mstrzezon.restaurant.service;

import com.mstrzezon.restaurant.exception.CartItemNotFound;
import com.mstrzezon.restaurant.exception.UserNotFound;
import com.mstrzezon.restaurant.model.Cart;
import com.mstrzezon.restaurant.model.CartItem;
import com.mstrzezon.restaurant.model.Order;
import com.mstrzezon.restaurant.model.OrderItem;
import com.mstrzezon.restaurant.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private OrderRepository orderRepository;

    private OrderItemRepository orderItemRepository;

    private CartItemRepository cartItemRepository;

    private UserRepository userRepository;


    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CartItemRepository cartItemRepository,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    public Set<OrderItem> getOrderItems(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow().getOrderItems();
    }

    public Set<Order> getOrders(Long userId) {
        return new HashSet<>(orderRepository.findOrdersByUserId(userId));
    }

    public Set<OrderItem> makeAnOrder(List<CartItem> cartItems, Long userId) {
        Set<OrderItem> orderItems = new HashSet<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDish(cartItem.getDish());
            orderItem.setPrice(cartItem.getDish().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            orderItems.add(orderItem);
            cartItemRepository.delete(cartItemRepository.findById(cartItem.getId()).orElseThrow(() -> new CartItemNotFound(cartItem.getId())));
        }
        Order order = new Order();
        order.setUser(userRepository.findById(userId).orElseThrow(() -> new UserNotFound(userId)));
        order.setOrderItems(orderItems);
        order.setPurchaseDate(LocalDateTime.now());
        orderItems.forEach(orderItem -> orderItem.setOrder(order));

        orderRepository.save(order);

        return order.getOrderItems();
    }
}
