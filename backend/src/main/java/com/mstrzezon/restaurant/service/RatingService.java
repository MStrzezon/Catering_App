package com.mstrzezon.restaurant.service;

import com.mstrzezon.restaurant.exception.DishNotFoundException;
import com.mstrzezon.restaurant.exception.UserNotFound;
import com.mstrzezon.restaurant.model.Dish;
import com.mstrzezon.restaurant.model.Rating;
import com.mstrzezon.restaurant.model.User;
import com.mstrzezon.restaurant.repository.DishRepository;
import com.mstrzezon.restaurant.repository.RatingRepository;
import com.mstrzezon.restaurant.repository.UserRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private UserRepository userRepository;

    private DishRepository dishRepository;

    private RatingRepository ratingRepository;

    public RatingService(UserRepository userRepository, DishRepository dishRepository, RatingRepository ratingRepository) {
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
        this.ratingRepository = ratingRepository;
    }

    public Integer getRating(Long userId, Long dishId) {
        List<Rating> ratingsForDish = ratingRepository.findRatingByDishDishId(dishId);
        if (ratingsForDish.stream().anyMatch(rating -> rating.getUser().getId().equals(userId))) {
            return ratingsForDish.stream().filter(rating -> rating.getUser().getId().equals(userId)).findFirst().get().getValue();
        }
        return 0;
    }

    public Integer updateRating(Long userId, Long dishId, Integer value) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFound(userId));
        Rating rating;
        if (user.getRatings().stream().anyMatch(userRating -> userRating.getDish().getDishId().equals(dishId))) {
            rating = user.getRatings().stream().filter(userRating -> userRating.getDish().getDishId().equals(dishId)).findFirst().get();
            rating.setValue(value);
        } else {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new DishNotFoundException(dishId));
            rating = new Rating();
            rating.setValue(value);
            rating.setUser(user);
            rating.setDish(dish);
        }
        ratingRepository.save(rating);
        return rating.getValue();
    }

}
