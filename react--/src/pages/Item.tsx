import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import CategoryType from "../types/CategoryType";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Item() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { isAuthenticated, jwtToken } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  // Handle input changes
  function handleItemName(event: React.ChangeEvent<HTMLInputElement>) {
    setItemName(event.target.value);
  }

  function handleItemPrice(event: React.ChangeEvent<HTMLInputElement>) {
    setItemPrice(Number(event.target.value)); 
  }

  function handleCategoryId(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategoryId(Number(event.target.value));
  }

  function handleDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  // Fetch items and categories from API
  async function getItems() {
    try {
      const response = await axios.get("http://localhost:8081/items", config);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  }

  async function loadCategories() {
    try {
      const response = await axios.get("http://localhost:8081/categories", config);
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  }

  async function saveItem() {
    try {
      await axios.post(
        "http://localhost:8081/items",
        {
          name: itemName,
          price: itemPrice,
          categoryId: categoryId,
          description: description,
        },
        config
      );
      getItems();
      resetForm(); 
    } catch (error) {
      console.error("Error saving item", error);
    }
  }

  // Load items 
  useEffect(() => {
    if (isAuthenticated) {
      getItems();
      loadCategories();
    }
  }, [isAuthenticated]);

  const [itemEditing, setItemEditing] = useState<ItemType | null>(null);

  // Edit item function
  function editItem(item: ItemType) {
    setItemEditing(item);
    setItemName(item.name);
    setItemPrice(item.price);
    setCategoryId(item.category ? item.category.id : 0); 
  }

  // Update item
  async function updateItem() {
    try {
      await axios.put(
        `http://localhost:8081/items/${itemEditing?.id}`,
        {
          name: itemName,
          price: itemPrice,
          categoryId: categoryId,
          description: description,
        },
        config
      );
      getItems();
      setItemEditing(null);
      resetForm();
    } catch (error) {
      console.error("Error updating item", error);
    }
  }

  // Delete item
  async function deleteItem(itemId: number) {
    try {
      await axios.delete(`http://localhost:8081/items/${itemId}`, config);
      getItems();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  }

  function resetForm() {
    setItemName("");
    setItemPrice(0);
    setCategoryId(0);
    setDescription("");
  }

  return (
    <div className="container mx-auto pt-5 pb-5">
      <h1 className="text-3xl font-semibold mb-5 text-slate-800">Items</h1>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-slate-200 text-sm font-medium text-slate-600">
            <th className="p-2 w-[50px] text-left">#</th>
            <th className="p-2 w-[200px] text-left">Item Name</th>
            <th className="p-2 text-left w-[100px]">Item Price</th>
            <th className="p-2 text-left w-[200px]">Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="p-2 text-slate-600 border-b border-slate-200">{item.id}</td>
              <td className="p-2 text-slate-600 border-b border-slate-200">{item.name}</td>
              <td className="p-2 text-slate-600 text-right border-b border-slate-200">{item.price}</td>
              <td className="p-2 text-slate-600 border-b border-slate-200">{item.category?.name || "No Category"}</td>
              <td className="p-2 border-b border-slate-200">
                <button className="me-3" onClick={() => editItem(item)}>
                  Edit
                </button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
        <h2 className="text-xl font-medium mb-4">{itemEditing ? "Edit Item" : "Add Item"}</h2>

        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-3">Enter item name</label>
          <input
            type="text"
            className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm"
            value={itemName}
            onChange={handleItemName}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-3">Enter item price</label>
          <input
            type="number"
            className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm"
            value={itemPrice}
            onChange={handleItemPrice}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-3">Enter category</label>
          <select
            className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm"
            value={categoryId}
            onChange={handleCategoryId}
          >
            <option value="0">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-3">Enter description</label>
          <textarea
            className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm"
            value={description}
            onChange={handleDescription}
          ></textarea>
        </div>

        {itemEditing ? (
          <button
            className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950"
            onClick={updateItem}
          >
            Update Item
          </button>
        ) : (
          <button
            className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950"
            onClick={saveItem}
          >
            Add Item
          </button>
        )}
      </div>
    </div>
  );
}

export default Item;
