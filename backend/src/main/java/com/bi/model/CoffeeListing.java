package com.bi.model;

import java.util.Date;
import java.util.UUID;

import com.bi.model.enums.BrewMethod;
import com.bi.model.enums.RoastType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false, exclude = { "userProfile" })
@ToString(exclude = { "userProfile" })
public class CoffeeListing extends BaseEntity {
    @Id
    @GeneratedValue
    private UUID listingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile userProfile;

    @Enumerated(EnumType.STRING)
    private RoastType roastType;

    @Enumerated(EnumType.STRING)
    private BrewMethod brewMethod;

    private String coffeeName;
    private Date roastDate;
    private int weightInKg;
}
