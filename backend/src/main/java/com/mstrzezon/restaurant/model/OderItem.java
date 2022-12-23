package com.mstrzezon.restaurant.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity(name = "order_item")
@Table(name = "order_items")
public class OderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "dish_id", nullable = false)
    private Dish dish;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}
