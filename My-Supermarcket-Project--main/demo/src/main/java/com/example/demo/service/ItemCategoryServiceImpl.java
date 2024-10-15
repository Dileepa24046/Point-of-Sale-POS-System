package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.ItemCategory;
import com.example.demo.repository.ItemCategoryRepository;

@Service
public class ItemCategoryServiceImpl implements ItemCategoryService {

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @Override
    public List<ItemCategory> getAllItemCategories() {
        return itemCategoryRepository.findAll();
    }

    @Override
    public ItemCategory createCategory(ItemCategory itemCategory) {
        return itemCategoryRepository.save(itemCategory);
    }

    @Override
    public ItemCategory updateCategory(Long id, ItemCategory itemCategory) {
        ItemCategory existingCategory = itemCategoryRepository.findById(id).orElse(null);
        if (existingCategory != null) {
            existingCategory.setName(itemCategory.getName());  
            return itemCategoryRepository.save(existingCategory);
        }
        return null;  
    }

    @Override
    public void deleteCategory(Long id) {
        itemCategoryRepository.deleteById(id);
    }

    @Override
    public ItemCategory getCategoryById(Long categoryId) {
        return itemCategoryRepository.findById(categoryId).orElse(null); // Or throw an exception if not found
    }
}
