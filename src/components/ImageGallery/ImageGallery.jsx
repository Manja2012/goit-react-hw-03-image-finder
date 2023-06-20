import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';

const ImageGallery = ({ photoName, onClick }) => (
    <div className='gallery'>
        <ul className={css.imageGallery}>
            {photoName.map(photo => (
                <ImageGalleryItem
                    key={photo.id}
                    photo={photo}
                    onClick={onClick}
                />
            ))}
        </ul>
    </div>
);
ImageGallery.propTypes = {
    photo: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
    }),
    photoName: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGallery;