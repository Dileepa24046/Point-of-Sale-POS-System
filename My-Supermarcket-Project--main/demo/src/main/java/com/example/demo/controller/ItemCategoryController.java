package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.ItemCategory;
import com.example.demo.service.ItemCategoryService;

@RestController
@CrossOrigin(origins = "*")
public class ItemCategoryController {
    
    @Autowired
    private ItemCategoryService itemCategoryService;

    // Get all categories
    @GetMapping("/categories")
    public ResponseEntity<List<ItemCategory>> getAllItemCategories() {
        List<ItemCategory> categories = itemCategoryService.getAllItemCategories();
        return ResponseEntity.ok(categories);
    }

    // Create a new category
    @PostMapping("/categories")
    public ResponseEntity<ItemCategory> createCategory(@RequestBody ItemCategory itemCategory) {
        try {
            ItemCategory createdCategory = itemCategoryService.createCategory(itemCategory);
            return ResponseEntity.status(201).body(createdCategory);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    // Update an existing category
    @PutMapping("/categories/{id}")
    public ResponseEntity<ItemCategory> updateCategory(
            @PathVariable Long id, @RequestBody ItemCategory itemCategory) {
        try {
            ItemCategory updatedCategory = itemCategoryService.updateCategory(id, itemCategory);
            return ResponseEntity.ok(updatedCategory);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    // Delete a category by ID
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        try {
            itemCategoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();  // Return 204 No Content on success
        } catch (Exception e) {
            return ResponseEntity.status(404).build();  // Return 404 Not Found if category not found
        }
    }
}
