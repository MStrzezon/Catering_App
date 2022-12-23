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


    @ManyToMany(cascade = CascadeType.PERSIST)
    private Set<DishCategory> dishCategories;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "dish_cuisine_id", nullable = false)
    private DishCuisine dishCuisine;

    @OneToMany(mappedBy = "dish")
    private Set<Rating> ratings;

    @OneToMany(mappedBy = "dish")
    private Set<Image> images;

    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "dish")
    @JsonIgnore
    private Set<CartItem> cartItems;
}
