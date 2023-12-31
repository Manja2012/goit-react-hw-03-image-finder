import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css'

const ImageGalleryItem = ({
    photo: { webformatURL, tags, largeImageURL },
    onClick,
}) => (
    <li className={css.imageGalleryItem}>
        <img
            className={css.imageGalleryItem__image}
            src={webformatURL}
            alt={tags}
            onClick={() => onClick(largeImageURL)}
        />
    </li>
);

ImageGalleryItem.propTypes = {
    photo: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;