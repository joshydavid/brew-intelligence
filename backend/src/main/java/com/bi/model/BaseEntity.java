package com.bi.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {
    @CreationTimestamp
    @JsonIgnore
    @Column(updatable = false)
    private Date createdAt;

    @UpdateTimestamp
    @JsonIgnore
    private Date updatedAt;
}
