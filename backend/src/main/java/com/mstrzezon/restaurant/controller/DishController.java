package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.exception.DishNotFoundException;
import com.mstrzezon.restaurant.model.Dish;
import com.mstrzezon.restaurant.repository.DishRepository;
import com.mstrzezon.restaurant.service.DishService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DishController {

    private final DishService service;

    private final DishRepository repository;

    DishController(DishService dishService, DishRepository dishRepository) {
        this.service = dishService;
        this.repository = dishRepository;
    }

    @GetMapping("/dishes")
    List<Dish> all() {
        return repository.findAll();
    }

    @PostMapping("/dishes")
    Dish newDish(@RequestBody Dish newDish) {
        return service.save(newDish);
    }

    @PostMapping("/dishes-many")
    void newDish(@RequestBody List<Dish> newDish) {
        for (Dish dish : newDish) {
            service.save(dish);
        }
    }

    @GetMapping("/dishes/{id}")
    Dish one(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new DishNotFoundException(id));
    }

    @PutMapping("dishes/{id}")
    Dish replaceDish(@RequestBody Dish newDish, @PathVariable Long id) {
        return repository.findById(id)
                .map(dish -> {
                    dish.setName(newDish.getName());
                    dish.setQuantity(newDish.getQuantity());
                    dish.setPrice(newDish.getPrice());
                    dish.setIngredients(newDish.getIngredients());
                    dish.setDishCategory(newDish.getDishCategory());
                    dish.setDishCuisine(newDish.getDishCuisine());
                    dish.setRatings(newDish.getRatings());
                    dish.setImages(newDish.getImages());
                    dish.setDescription(newDish.getDescription());
                    return repository.save(newDish);
                })
                .orElseGet(() -> {
                    newDish.setDishId(id);
                    return repository.save(newDish);
                });
    }

}
