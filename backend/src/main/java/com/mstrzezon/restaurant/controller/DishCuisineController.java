package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.model.Dish;
import com.mstrzezon.restaurant.model.DishCuisine;
import com.mstrzezon.restaurant.repository.DishCuisineRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DishCuisineController {

    private final DishCuisineRepository repository;

    DishCuisineController(DishCuisineRepository dishCuisineRepository) {
        this.repository = dishCuisineRepository;
    }

    @GetMapping("/dish-cuisines")
    List<DishCuisine> all() {
        return repository.findAll();
    }
}
