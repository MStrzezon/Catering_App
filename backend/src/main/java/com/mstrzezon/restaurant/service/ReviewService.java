package com.mstrzezon.restaurant.service;

import com.mstrzezon.restaurant.exception.UserNotFound;
import com.mstrzezon.restaurant.model.Review;
import com.mstrzezon.restaurant.repository.ReviewRepository;
import com.mstrzezon.restaurant.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository repository, UserRepository userRepository) {
        this.reviewRepository = repository;
        this.userRepository = userRepository;
    }

    public List<Review> reviews(long dishId) {
        return reviewRepository.findReviewsByDishDishId(dishId);
    }

    public Review createReview(String text, String purchaseDate) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Review review = new Review();
        review.setUser(userRepository.findById(userDetails.getId()).orElseThrow(() -> new UserNotFound(userDetails.getId())));
        review.setText(text);
        review.setPurchaseDate(purchaseDate);
        reviewRepository.save(review);
        return review;
    }
}
