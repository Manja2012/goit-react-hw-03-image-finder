import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import css from './searchbar.module.css';

class Searchbar extends Component {
    state = {
        searchName: '',
    };
    handleNameChange = e => {
        this.setState({ searchName: e.currentTarget.value.toLowerCase() });
    };
    onSubmit = e => {
        e.preventDefault();

        if (this.state.searchName.trim() === '') {
            toast.error('Please select an image', {
                theme: " "
            });
            return;
        }
        this.props.onSubmit(this.state.searchName);
    };

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={this.onSubmit}>
                    <input
                        className={css.searchForm__input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.searchName}
                        onChange={this.handleNameChange}
                    />
                    <button type="submit" className={css.searchForm__button}>
                        <FcSearch  />
                    </button>
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
// import React, { Component } from 'react';
// import { FcSearch } from 'react-icons/fc';
// import PropTypes from 'prop-types';

// import 'react-toastify/dist/ReactToastify.css';
// import '../../index.css';

// export class SearchBar extends Component {
//   state = {
//     inputQuery: '',
//   };

//   handleNameChange = event => {
//     this.setState({ inputQuery: event.currentTarget.value.toLowerCase() });
//   };

//   render() {
//     return (
//       <div>
//         <header className="Searchbar">
//           <form
//             className="SearchForm"
//             onSubmit={event => {
//               event.preventDefault();
//               this.props.onSubmit(this.state.inputQuery);
//               event.target.reset(); //очистка поля введення
//             }}
//           >
//             <input
//               className="SearchForm-input"
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               onChange={this.handleNameChange}
//             />
//             <button type="submit" className="SearchForm-button">
//               {/* <span className="SearchForm-button-label"> */}
//               <FcSearch />
//               {/* </span> */}
//             </button>
//           </form>
//         </header>
//       </div>
//     );
//   }
// }

// export default SearchBar;

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func,
// };