import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  StockType  from './StockType';

const Stock: React.FC = () => {
    const [stocks, setStocks] = useState<StockType[]>([]);
    const [selectedStock, setSelectedStock] = useState<StockType | null>(null);
    const [quantity, setQuantity] = useState<number>(0);

    // Fetch all stocks
    const fetchStocks = async () => {
        try {
            const response = await axios.get<StockType[]>('http://localhost:8080/stocks');
            setStocks(response.data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    // Create new stock
    const createStock = async () => {
        try {
            const newStock = { quantity, item: selectedStock?.item }; // Replace with the correct structure
            const response = await axios.post<StockType>('http://localhost:8080/stocks', newStock);
            setStocks([...stocks, response.data]);
            setQuantity(0); // Reset quantity
        } catch (error) {
            console.error('Error creating stock:', error);
        }
    };

    // Update existing stock
    const updateStock = async (id: number) => {
        if (selectedStock) {
            try {
                const updatedStock = { quantity, item: selectedStock.item }; // Replace with the correct structure
                const response = await axios.put<StockType>(`http://localhost:8080/stocks/${id}`, updatedStock);
                setStocks(stocks.map(stock => (stock.id === id ? response.data : stock)));
            } catch (error) {
                console.error('Error updating stock:', error);
            }
        }
    };

    // Delete stock
    const deleteStock = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/stocks/${id}`);
            setStocks(stocks.filter(stock => stock.id !== id));
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    return (
        <div>
            <h1>Stock Management</h1>
            <div>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Quantity"
                />
                <button onClick={createStock}>Create Stock</button>
            </div>
            <div>
                {stocks.map((stock) => (
                    <div key={stock.id}>
                        <span>Stock ID: {stock.id} - Quantity: {stock.quantity}</span>
                        <button onClick={() => {
                            setSelectedStock(stock);
                            setQuantity(stock.quantity); // Set the quantity for updating
                        }}>
                            Update
                        </button>
                        <button onClick={() => deleteStock(stock.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stock;
