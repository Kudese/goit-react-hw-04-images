import PropTypes from 'prop-types';
import s from '../Searchbar/Searchbar.module.css';
export default function Searcbar({ onSubmit }) {
  return (
    <header className={s['Searchbar']}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          name="search"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searcbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
