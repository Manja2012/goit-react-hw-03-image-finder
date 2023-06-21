import React from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Searchbar from 'components/Searchbar/Searchbar.jsx';
import ImageGallery from 'components/ImageGallery/ImageGallery.jsx';
import Button from 'components/Button/Button.jsx';
import Modal from 'components/Modal/Modal.jsx';
import Loader from 'components/Loader/Loader.jsx';
import css from './app.module.css';

class App extends React.Component {
  state = {
    page: 1,
    per_page: 12,
    photo: [],
    photoName: '',
    currentLargeImageURL: '',
    searchTotal: null,
    loading: false,
    error: null,
  };

  handlerFormSubmit = photoName => {
    if (photoName !== this.state.photoName) {
      this.setState({ photoName, page: 1 });
      this.setState({ photo: [] })
      return;
    }
    else {
      toast.info(`Sorry image ${photoName} not found`, {
        theme: "colored",
      });
    }

  };

  onOpenModalWithLargeImage = url => {
    this.setState({
      currentLargeImageURL: url,
    });
  };

  onModalClose = () => {
    this.setState({
      currentLargeImageURL: '',
    });
  };

  hendlerMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.photoName;
    const prevPage = prevState.page;
    const { photoName, page, per_page } = this.state;
    const key = 'key=35750180-cd749992051e3f8ac143842f2'

    if (photoName !== prevName) {
      this.setState({ photo: [] });
    }
    if (prevName !== photoName || prevPage !== page) {
      this.setState({ loading: true });

        fetch(
        `https://pixabay.com/api/?q=${photoName}&page=${page}&${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error());
        })
        .then(photo =>
          this.setState(prevState => ({
            photo: [...prevState.photo, ...photo.hits],
            searchTotal: photo.totalHits,
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loading: false }));
    }
  }

  render() {
    const {
      page,
      photo,
      currentLargeImageURL,
      searchTotal,
      loading,
    } = this.state;
    const rounded_up = Math.ceil(searchTotal/12);
    return (
      <section className={css.app}>
        <Searchbar onSubmit={this.handlerFormSubmit} page={page} />

        {photo && <ImageGallery
          photoName={photo}
          onClick={this.onOpenModalWithLargeImage}
        />
        }

        {currentLargeImageURL && (
          < Modal closeModal={this.onModalClose} url={currentLargeImageURL} />
        )}
        {loading && <Loader />}
        {!loading &&  page < rounded_up && <Button onClick={this.hendlerMoreClick} />}
        <ToastContainer autoClose={2500} />
      </section>
    );
  }
}
export default App;
 