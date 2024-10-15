package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category") // Item entity එකේ category attribute එකට සම්බන්ධයි
    private List<Item> items; // ItemCategory එකට සම්බන්ධ Item ගණන

}
