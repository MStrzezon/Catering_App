package com.mstrzezon.restaurant.repository;

import com.mstrzezon.restaurant.model.DishCuisine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DishCuisineRepository extends JpaRepository<DishCuisine, Long> {
    List<DishCuisine> findByName(String name);
}
