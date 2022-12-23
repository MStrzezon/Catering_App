package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.model.DishCategory;
import com.mstrzezon.restaurant.repository.DishCategoryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DishCategoryController {

    private final DishCategoryRepository repository;

    DishCategoryController(DishCategoryRepository dishCategoryRepository) {
        this.repository = dishCategoryRepository;
    }

    @GetMapping("/dish-categories")
    List<DishCategory> all() {
        return repository.findAll();
    }
}
