package com.mstrzezon.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity(name = "dishCategory")
@Table(name = "dish_categories")
@Getter
@Setter
public class DishCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long dishCategoryId;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "dishCategories")
    @JsonIgnore
    private List<Dish> dish;
}
