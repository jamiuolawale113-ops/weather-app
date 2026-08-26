import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ isSearching, onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor="location-search">
        Search for a city
      </label>
      <FiSearch aria-hidden="true" />
      <input
        id="location-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a city (e.g. Lagos, London, Tokyo)"
      />
      <button type="submit" disabled={isSearching || !query.trim()}>
        {isSearching ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
