package com.mstrzezon.restaurant.controller;

import com.mstrzezon.restaurant.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/user/{userId}/is_ordered/{dishId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String isOrdered(@PathVariable Long userId, @PathVariable Long dishId) {
        return String.valueOf(userService.isDishOrderedByUser(userId, dishId));
    }
}
