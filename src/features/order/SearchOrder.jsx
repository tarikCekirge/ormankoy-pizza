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
                type="text"
                placeholder="Sipariş ara"
                value={query}
                onChange={handleChange}
            />
            <button type="submit" disabled={!query.trim()}>
                Sipariş Ara
            </button>
        </form>
    );
};

export default SearchOrder;
