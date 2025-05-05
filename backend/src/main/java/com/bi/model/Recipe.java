
package com.bi.model;

import java.util.List;
import java.util.UUID;

import com.bi.model.enums.MethodType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
public class Recipe extends BaseEntity {
    @Id
    @GeneratedValue
    private UUID recipeId;

    @Enumerated(EnumType.STRING)
    private MethodType methodType;

    private double coffeeDose;
    private double waterAmount;
    private int brewTemp;
    private String brewTime;

    private List<String> brewInstructions;
    private String createdBy;
}
