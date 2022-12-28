package com.mstrzezon.restaurant.service;

import com.mstrzezon.restaurant.exception.DishNotFoundException;
import com.mstrzezon.restaurant.model.*;
import com.mstrzezon.restaurant.repository.*;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DishService {

    private final DishRepository dishRepository;

    private final IngredientRepository ingredientRepository;

    private final DishCategoryRepository dishCategoryRepository;

    private final DishCuisineRepository dishCuisineRepository;

    private final ImageRepository imageRepository;

    DishService(DishRepository dishRepository, IngredientRepository ingredientRepository, DishCategoryRepository dishCategoryRepository,
                DishCuisineRepository dishCuisineRepository, ImageRepository imageRepository) {
        this.dishRepository = dishRepository;
        this.ingredientRepository = ingredientRepository;
        this.dishCategoryRepository = dishCategoryRepository;
        this.dishCuisineRepository = dishCuisineRepository;
        this.imageRepository = imageRepository;
    }

    public Dish save(Dish newDish) {
        Set<Ingredient> ingredients = newDish.getIngredients();
        DishCategory dishCategory = newDish.getDishCategory();
        DishCuisine dishCuisine = newDish.getDishCuisine();
        Set<Image> images = newDish.getImages();

        newDish.setIngredients(ingredientsToSave(ingredients));
        newDish.setDishCategory(dishCategoryToSave(dishCategory));
        newDish.setDishCuisine(dishCuisineToSave(dishCuisine));
        newDish.setImages(imagesToSave(images, newDish));
        return dishRepository.save(newDish);
    }

    public Set<Ingredient> ingredientsToSave(Set<Ingredient> ingredients) {
        return ingredients.stream()
                .map(ingredient -> ingredientRepository.findByName(ingredient.getName()).isEmpty() ?
                        ingredientRepository.save(ingredient) : ingredientRepository.findByName(ingredient.getName()).get(0))
                .collect(Collectors.toSet());
    }

    public DishCategory dishCategoryToSave(DishCategory dishCategory) {
        return dishCategoryRepository.findByName(dishCategory.getName()).isEmpty() ?
                dishCategoryRepository.save(dishCategory) : dishCategoryRepository.findByName(dishCategory.getName()).get(0);
    }

    public DishCuisine dishCuisineToSave(DishCuisine dishCuisine) {
        return dishCuisineRepository.findByName(dishCuisine.getName()).isEmpty() ?
                dishCuisineRepository.save(dishCuisine) : dishCuisineRepository.findByName(dishCuisine.getName()).get(0);
    }

    public Set<Image> imagesToSave(Set<Image> images, Dish newDish) {
        Set<Image> listImages = new HashSet<>();
        for (Image image : images) {
            Image mergedImage = imageRepository.save(image);
            mergedImage.setDish(newDish);
            listImages.add(mergedImage);
        }

        return listImages;
    }

    public void addRating(Long dishId, Integer ratingValue) {
        Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new DishNotFoundException(dishId));
        Set<Rating> dishRatings = dish.getRatings();
        Rating dishRating = new Rating();
        dishRating.setDish(dish);
        dishRating.setValue(ratingValue);
        dishRatings.add(dishRating);
        dish.setRatings(dishRatings);
        dishRepository.save(dish);
    }
}
