import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchType"
          id="ingredient"
          value="ingredient"

        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="searchType"
          id="name"
          value="name"

        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchType"
          id="firstLetter"
          value="firstLetter"

        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </div>
  );
}

export default SearchBar;
