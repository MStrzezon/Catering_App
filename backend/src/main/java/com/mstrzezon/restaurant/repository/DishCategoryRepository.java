package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.DishCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DishCategoryRepository extends JpaRepository<DishCategory, Long> {
    List<DishCategory> findByName(String name);
}
