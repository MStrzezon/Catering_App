package com.mstrzezon.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.math.BigDecimal;
import java.util.Set;

@Entity(name = "cart")
@Table(name = "cart")
@Getter
@Setter
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long cartId;

    @OneToOne(mappedBy = "cart")
    @JsonIgnore
    private User user;

    @Column(name = "sub_total", nullable = false)
    private BigDecimal subTotal;

    @OneToMany(mappedBy = "cart")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<CartItem> cartItems;
}
