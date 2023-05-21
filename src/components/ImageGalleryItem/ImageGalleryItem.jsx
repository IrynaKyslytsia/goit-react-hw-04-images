import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, showModal }) => {
    return (<li className={css.galleryItem}>
        <img
            src={webformatURL}
            alt={tags}
            onClick={() => showModal(largeImageURL)}
            className={css.image} />
    </li>)
};

export default ImageGalleryItem;

ImageGalleryItem.propType = {
    description: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
};