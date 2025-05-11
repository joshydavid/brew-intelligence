package com.bi.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import com.bi.model.enums.BrewMethod;
import com.bi.model.enums.RoastType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoffeeListingDTO implements Serializable {
    private UUID listingId;
    private String coffeeName;
    private RoastType roastType;
    private Date roastDate;
    private int weightInKg;
    private BrewMethod brewMethod;
    private Date createdAt;
}
