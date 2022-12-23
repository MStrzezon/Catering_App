package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
