import CategoryType from "./CategoryType";

interface ItemType {
    id: number,
    name: String,
    price: number,
    description: String,
    category: CategoryType
}

export default ItemType;