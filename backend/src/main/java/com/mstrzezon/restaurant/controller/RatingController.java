package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.service.RatingService;
import org.springframework.web.bind.annotation.*;

@RestController
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("/user/{userId}/ratings/dishes/{dishId}")
    public Integer getRating(@PathVariable Long userId, @PathVariable Long dishId) {
        return ratingService.getRating(userId, dishId);
    }

    @PostMapping("/user/{userId}/ratings/dishes/{dishId}")
    public Integer updateRating(@PathVariable Long userId, @PathVariable Long dishId, @RequestParam Integer value) {
        return ratingService.updateRating(userId, dishId, value);
    }
}
