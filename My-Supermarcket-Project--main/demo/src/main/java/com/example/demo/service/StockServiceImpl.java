package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Stock;
import com.example.demo.repository.StockRepository;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Override
    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @Override
    public Stock updateStock(Long id, Stock stock) {
        Stock existingStock = stockRepository.findById(id).orElse(null);
        if (existingStock != null) {
            existingStock.setQuantity(stock.getQuantity());
            existingStock.setItem(stock.getItem());
            return stockRepository.save(existingStock);
        }
        return null;
    }

    @Override
    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
