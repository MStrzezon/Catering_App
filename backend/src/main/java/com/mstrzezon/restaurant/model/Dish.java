package com.mstrzezon.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Entity(name = "dish")
@Table(name = "dishes")
@Getter
@Setter
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long dishId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private long quantity;

    @Column(nullable = false)
    private BigDecimal price;

    @ManyToMany(cascade=CascadeType.PERSIST)
    private Set<Ingredient> ingredients;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "dish_category_id", nullable = false)
    private DishCategory dishCategory;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "dish_cuisine_id", nullable = false)
    private DishCuisine dishCuisine;

    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL)
    private Set<Rating> ratings;

    @OneToMany(mappedBy = "dish", cascade = CascadeType.MERGE)
    private Set<Image> images;

    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "dish", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Set<CartItem> cartItems;
}
