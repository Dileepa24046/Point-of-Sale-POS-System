import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Home page</h1>
            <Link to="/categories">Category</Link>
            <br></br>
            <Link to="/items">Items</Link>
        </div>
    );
}
