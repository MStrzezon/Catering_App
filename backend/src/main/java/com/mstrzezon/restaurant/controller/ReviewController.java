package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.model.Review;
import com.mstrzezon.restaurant.payload.request.ReviewRequest;
import com.mstrzezon.restaurant.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/reviews")
    private List<Review> reviews(@RequestParam long dishId) {
        return reviewService.reviews(dishId);
    }

    @PostMapping("/reviews")
    private Review createReview(@RequestBody ReviewRequest request) {
        return reviewService.createReview(request.getText(), request.getPurchaseDate());
    }
}
