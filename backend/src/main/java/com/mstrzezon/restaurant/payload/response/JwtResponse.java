package com.mstrzezon.restaurant.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class JwtResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String token;
    private String refreshToken;
    private List<String> roles;
    private Long cartId;
}
