import  ItemType from './ItemType';

export interface StockType {
    id: number;         
    quantity: number;  
    item: ItemType;     
}

export default StockType;