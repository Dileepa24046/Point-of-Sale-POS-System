package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.StockReqDTO;
import com.example.demo.entity.Item;
import com.example.demo.entity.Stock;
import com.example.demo.service.ItemService;
import com.example.demo.service.StockService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private ItemService itemService;

    @GetMapping("/stocks")
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        return ResponseEntity.status(200).body(stocks);
    }

    @PostMapping("/stocks")
    public ResponseEntity<Stock> createStock(@RequestBody StockReqDTO stockReqDTO) {
   
        Stock newStock = new Stock();
        newStock.setQuantity(0); 

        
        List<Item> stockItems = new ArrayList<>();
        List<Long> itemIds = stockReqDTO.getItemIds();

        
        itemIds.forEach(itemId -> {
            Item item = itemService.getItemById(itemId);  
            if (item != null) {
                stockItems.add(item); 
                newStock.setQuantity(newStock.getQuantity() + 1);
            }
        });

        
        newStock.setItem(stockItems.isEmpty() ? null : stockItems.get(0)); 
        Stock createdStock = stockService.createStock(newStock);

        return ResponseEntity.status(201).body(createdStock);  
    }

    
    @PutMapping("/stocks/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody StockReqDTO stockReqDTO) {
        try {
            Stock existingStock = stockService.updateStock(id, stockReqDTOToStock(stockReqDTO));

            if (existingStock != null) {
                return ResponseEntity.status(200).body(existingStock);
            } else {
                return ResponseEntity.status(404).body(null);  
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);  
        }
    }

    
    @DeleteMapping("/stocks/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        try {
            stockService.deleteStock(id);
            return ResponseEntity.status(204).build();  
        } catch (Exception e) {
            return ResponseEntity.status(404).build();  
        }
    }

    // Helper method to convert StockReqDTO to Stock
    private Stock stockReqDTOToStock(StockReqDTO stockReqDTO) {
        Stock stock = new Stock();
        stock.setQuantity(0); // Initialize quantity

        List<Item> stockItems = new ArrayList<>();
        // Fetch the items based on the provided item IDs
        stockReqDTO.getItemIds().forEach(itemId -> {
            Item item = itemService.getItemById(itemId);
            if (item != null) {
                stockItems.add(item);
                stock.setQuantity(stock.getQuantity() + 1); // Increment quantity
            }
        });

        stock.setItem(stockItems.isEmpty() ? null : stockItems.get(0)); // Set the first item
        return stock;
    }
}
