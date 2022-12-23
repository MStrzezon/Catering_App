package com.mstrzezon.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity(name = "dishCuisine")
@Table(name = "dish_cuisines")
@Getter
@Setter
public class DishCuisine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long dishCuisineId;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "dishCuisine")
    @JsonIgnore
    private List<Dish> dishes;
}
