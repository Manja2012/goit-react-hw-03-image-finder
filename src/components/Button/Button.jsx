import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css'

const Button = ({ onClick }) => (
    <button onClick={() => onClick()} 
            className={css.button__more} 
            type="button">Load more 
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Button;