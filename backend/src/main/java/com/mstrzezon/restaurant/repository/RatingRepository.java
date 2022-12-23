package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {
}
