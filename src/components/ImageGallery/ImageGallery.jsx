import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

import css from './ImageGallery.module.css'

const ImageGallery = ({ images, showModal }) => {
    
    return (
        <ul className={css.imageGallery}>
            {images.map(({ webformatURL, largeImageURL, tags, id }) => {
                return <ImageGalleryItem
                        key={id}
                        description={tags}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        showModal={showModal}    
                        />
                    })}
        </ul>
    )
 };

export default ImageGallery;

ImageGallery.propType = {
    images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
    ).isRequired,
    showModal: PropTypes.func.isRequired,
};