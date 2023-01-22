package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findRatingByDishDishId(long dishId);
}
