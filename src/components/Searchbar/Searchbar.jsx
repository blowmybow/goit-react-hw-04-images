import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './Searchbar.styled';

export default function SearchBar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = e => setInputValue(e.target.value);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearchName(searchName.trim());
    onSubmit(inputValue);
    setInputValue('');
  };
  return (
    <header>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchButton>
          <SearchSpan>Search</SearchSpan>
        </SearchButton>
        <SearchInput
          name="searchName"
          type="text"
          id="search"
          value={inputValue}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </header>
  );
}
SearchBar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
