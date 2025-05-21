import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        navigate(`/siparis/${query.trim()}`);
        setQuery("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
                type="text"
                placeholder="Sipariş ara #"
                value={query}
                onChange={handleChange}
            />
        </form>
    );
};

export default SearchOrder;
