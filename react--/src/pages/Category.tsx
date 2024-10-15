import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import { Link } from "react-router-dom";

function Category() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");

    // Function to load categories
    async function loadCategories() {
        try {
            const apiResponse = await axios.get("http://localhost:8080/categories");
            setCategories(apiResponse.data);
        } catch (error) {
            console.error("Error loading categories", error);
        }
    }

    // Handle input changes
    function handleCategoryName(event: any) {
        setCategoryName(event.target.value);
    }

    // Function to add a new category
    async function addCategory() {
        try {
            await axios.post("http://localhost:8080/categories", {
                name: categoryName,
            });
            loadCategories(); // Refresh the categories list after adding a new one
        } catch (error) {
            console.error("Error adding category", error);
        }
    }

    // useEffect to call loadCategories when the component mounts
    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div>
            <div>
                <h2>Create Category</h2>
                <label>Enter Category Name</label>
                <input type="text" onChange={handleCategoryName} />
                <button onClick={addCategory}>Add Category</button>
            </div>
            <h1>Categories</h1>
            <ul>
                {categories && categories.map((category: CategoryType) => (
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>

            <Link to="/">Home</Link>
        </div>
    );
}

export default Category;
