package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findReviewsByDishDishId(long dishId);
}
