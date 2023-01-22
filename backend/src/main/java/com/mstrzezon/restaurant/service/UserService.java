package com.mstrzezon.restaurant.service;

import com.mstrzezon.restaurant.exception.UserNotFound;
import com.mstrzezon.restaurant.model.OrderItem;
import com.mstrzezon.restaurant.model.User;
import com.mstrzezon.restaurant.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isDishOrderedByUser(Long userId, Long dishId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFound(userId));
        List<Long> userOrderedDishes = user.getOrders().stream().flatMap(order -> order.getOrderItems().stream().map(orderItem -> orderItem.getDish().getDishId())).toList();
        return userOrderedDishes.contains(dishId);
    }
}
