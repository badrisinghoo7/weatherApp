import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{ marginRight: "10px", padding: "10px" }}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            aria-label="City name"
          />
          <button type="submit" style={{ padding: "10px" }}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
