package com.mstrzezon.restaurant.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewRequest {
    @NotBlank
    private String text;

    @NotBlank
    private String purchaseDate;
}
