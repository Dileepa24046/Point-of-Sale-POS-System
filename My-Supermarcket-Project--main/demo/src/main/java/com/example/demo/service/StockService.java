package com.example.demo.service;

import com.example.demo.entity.Stock;
import java.util.List;

public interface StockService {
    Stock createStock(Stock stock);
    List<Stock> getAllStocks();
    Stock updateStock(Long id, Stock stock);
    void deleteStock(Long id);
}
