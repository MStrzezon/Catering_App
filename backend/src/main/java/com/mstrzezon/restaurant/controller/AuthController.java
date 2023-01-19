package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.exception.TokenRefreshException;
import com.mstrzezon.restaurant.model.ERole;
import com.mstrzezon.restaurant.model.Role;
import com.mstrzezon.restaurant.model.User;
import com.mstrzezon.restaurant.payload.request.LoginRequest;
import com.mstrzezon.restaurant.payload.request.SignupRequest;
import com.mstrzezon.restaurant.payload.request.TokenRefreshRequest;
import com.mstrzezon.restaurant.payload.response.MessageResponse;
import com.mstrzezon.restaurant.payload.response.TokenRefreshResponse;
import com.mstrzezon.restaurant.payload.response.UserInfoResponse;
import com.mstrzezon.restaurant.repository.RoleRepository;
import com.mstrzezon.restaurant.repository.UserRepository;
import com.mstrzezon.restaurant.security.jwt.JwtUtils;
import com.mstrzezon.restaurant.service.RefreshTokenService;
import com.mstrzezon.restaurant.service.UserDetailsImpl;
import com.mstrzezon.restaurant.model.RefreshToken;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/auth")
public class AuthController {

    RefreshTokenService refreshTokenService;

    AuthenticationManager authenticationManager;

    UserRepository userRepository;

    RoleRepository roleRepository;

    PasswordEncoder encoder;

    JwtUtils jwtUtils;

    private static final String ROLE_NOT_FOUND = "Error: Role is not found.";

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils,
                          RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest tokenRefreshRequest) {
        String requestRefreshToken = tokenRefreshRequest.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (Boolean.TRUE.equals(userRepository.existsByUsername(signupRequest.getUsername()))) {
            return ResponseEntity.badRequest().body(new MessageResponse(ROLE_NOT_FOUND));
        }
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(encoder.encode(signupRequest.getPassword()));

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (isNull(strRoles)) {
            Role clientRole = roleRepository.findByName(ERole.ROLE_CLIENT)
                    .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND));
            roles.add(clientRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin" -> {
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND));
                        roles.add(adminRole);
                    }
                    case "manager" -> {
                        Role modRole = roleRepository.findByName(ERole.ROLE_MANAGER)
                                .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND));
                        roles.add(modRole);
                    }
                    default -> {
                        Role userRole = roleRepository.findByName(ERole.ROLE_CLIENT)
                                .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND));
                        roles.add(userRole);
                    }
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out"));
    }
}