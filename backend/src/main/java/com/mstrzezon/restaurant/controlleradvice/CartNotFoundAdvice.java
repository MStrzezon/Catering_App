package com.mstrzezon.restaurant.controlleradvice;

import com.mstrzezon.restaurant.exception.CartNotFoundException;
import com.mstrzezon.restaurant.exception.DishNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class CartNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(CartNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String cartNotFoundAdvice(CartNotFoundException ex) {
        return ex.getMessage();
    }
}