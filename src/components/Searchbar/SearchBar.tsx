import { FC, useState } from "react";

import css from "./SearchBar.module.css";

import { ISearchBarProps } from "./SearchBar.types";

import { CiSearch } from "react-icons/ci";

export const SearchBar: FC<ISearchBarProps> = ({ onFormSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onFormSubmit(value);

    setValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmitSearchForm}>
        <button type="submit" className={css.button}>
          <CiSearch size={30} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
