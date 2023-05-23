import { useState } from "react";
import PropTypes from 'prop-types';
import { ImSearch } from "react-icons/im";
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
    const [searchText, setSearchText] = useState('')

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchText(value.toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchText.trim() === '') {
            Notiflix.Notify.info('Please enter something!');
            return;
        }
        onSubmit(searchText);
        setSearchText('')
    };

        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={handleSubmit} >
                    <button type="submit" className={css.button}>
                        <ImSearch/>
                    </button>
    
                    <input
                        className={css.input}
                        type="text"
                        value={searchText}
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
            )
};

export default Searchbar;

Searchbar.propType = {
    onSubmit: PropTypes.func.isRequired,
};