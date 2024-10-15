package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.ItemCategory;

@Service
public interface ItemCategoryService {
    List<ItemCategory> getAllItemCategories();
    ItemCategory createCategory(ItemCategory itemCategory);  
    ItemCategory updateCategory(Long id, ItemCategory itemCategory);
    void deleteCategory(Long id);
    ItemCategory getCategoryById(Long categoryId);
}
