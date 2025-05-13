package com.bi.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@EqualsAndHashCode(callSuper = false, exclude = { "listings", "recipes" })
@ToString(exclude = { "listings", "recipes" })
public class UserProfile extends BaseEntity {
    @Id
    private String userId;

    private String name;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private List<CoffeeListing> listings;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private List<Recipe> recipes;
}
