import { Component } from "react";
import PropTypes from 'prop-types';
import { ImSearch } from "react-icons/im";
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        searchText: ''
    };

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ searchText: value.toLowerCase() });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.searchText.trim() === '') {
            Notiflix.Notify.info('Please enter something!');
            return;
        }
        this.props.onSubmit(this.state.searchText);
        this.setState({ searchText: '' })
    };

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit} >
                    <button type="submit" className={css.button}>
                        <ImSearch/>
                    </button>
    
                    <input
                        className={css.input}
                        type="text"
                        value={this.state.searchText}
                        onChange={this.handleChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
            )
        }
};

export default Searchbar;

Searchbar.propType = {
    onSubmit: PropTypes.func.isRequired,
};