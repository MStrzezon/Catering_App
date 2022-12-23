package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.model.Ingredient;
import com.mstrzezon.restaurant.repository.IngredientRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IngredientController {

    private final IngredientRepository repository;

    IngredientController(IngredientRepository ingredientRepository) {
        this.repository = ingredientRepository;
    }

    @GetMapping("/ingredients")
    List<Ingredient> all() {
        return repository.findAll();
    }

    @PostMapping("/ingredients")
    Ingredient newIngredient(@RequestBody Ingredient newIngredient) {
        return repository.save(newIngredient);
    }
}
