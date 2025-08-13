import { useState } from "react";

export function SearchBar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  function openSearch() {
    setOpenSearchBar(true);
  }

  function closeSearch() {
    setOpenSearchBar(false);
  }

  return (
    <>
      <button className={`button search ${openSearchBar ? "open" : ""}`} id="filter" onClick={openSearchBar ? closeSearch : openSearch}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </button>
      <form className={`search-form ${openSearchBar ? "open" : ""}`}>
        <label className={`search-form__label ${openSearchBar ? "open" : ""}`}>
          <input type="text" className="search-form__input" />
        </label>
        <button className={`search-action ${openSearchBar ? "open" : ""}`}>Search</button>
      </form>
    </>
  );
}
