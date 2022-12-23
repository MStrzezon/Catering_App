package com.mstrzezon.restaurant.service;

import com.mstrzezon.restaurant.model.Dish;
import com.mstrzezon.restaurant.model.DishCategory;
import com.mstrzezon.restaurant.model.DishCuisine;
import com.mstrzezon.restaurant.model.Ingredient;
import com.mstrzezon.restaurant.repository.DishCategoryRepository;
import com.mstrzezon.restaurant.repository.DishCuisineRepository;
import com.mstrzezon.restaurant.repository.DishRepository;
import com.mstrzezon.restaurant.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DishService {

    private final DishRepository dishRepository;

    private final IngredientRepository ingredientRepository;

    private final DishCategoryRepository dishCategoryRepository;

    private final DishCuisineRepository dishCuisineRepository;

    DishService(DishRepository dishRepository, IngredientRepository ingredientRepository, DishCategoryRepository dishCategoryRepository, DishCuisineRepository dishCuisineRepository) {
        this.dishRepository = dishRepository;
        this.ingredientRepository = ingredientRepository;
        this.dishCategoryRepository = dishCategoryRepository;
        this.dishCuisineRepository = dishCuisineRepository;
    }

    public Dish save(Dish newDish) {
        Set<Ingredient> ingredients = newDish.getIngredients();
        Set<DishCategory> dishCategories = newDish.getDishCategories();
        DishCuisine dishCuisine = newDish.getDishCuisine();

        newDish.setIngredients(ingredientsToSave(ingredients));
        newDish.setDishCategories(dishCategoriesToSave(dishCategories));
        newDish.setDishCuisine(dishCuisineToSave(dishCuisine));
        return dishRepository.save(newDish);
    }

    public Set<Ingredient> ingredientsToSave(Set<Ingredient> ingredients) {
        return ingredients.stream()
                .map(ingredient -> ingredientRepository.findByName(ingredient.getName()).isEmpty() ?
                        ingredientRepository.save(ingredient) : ingredientRepository.findByName(ingredient.getName()).get(0))
                .collect(Collectors.toSet());
    }

    public Set<DishCategory> dishCategoriesToSave(Set<DishCategory> dishCategories) {
        return dishCategories.stream()
                .map(dishCategory -> dishCategoryRepository.findByName(dishCategory.getName()).isEmpty() ?
                        dishCategoryRepository.save(dishCategory) : dishCategoryRepository.findByName(dishCategory.getName()).get(0))
                .collect(Collectors.toSet());
    }

    public DishCuisine dishCuisineToSave(DishCuisine dishCuisine) {
        return dishCuisineRepository.findByName(dishCuisine.getName()).isEmpty() ?
                dishCuisineRepository.save(dishCuisine) : dishCuisineRepository.findByName(dishCuisine.getName()).get(0);
    }
}
