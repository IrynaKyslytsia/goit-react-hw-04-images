import { useEffect, useState } from "react";
import Notiflix from 'notiflix';
import { getImages } from "services/getImages";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Modal from 'components/Modal/Modal';
import css from './App.module.css'

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (searchText === '') {
      return;
    };

    setIsLoading(true);

    getImages(searchText, page)
            .then(data => {
                if (data.hits.length === 0) {
                    Notiflix.Notify.failure('There are no images...');
                }

                setImages(prevState => ([...prevState, ...data.hits]));
            })
            .catch(error => setError(error))
            .finally(() => {setIsLoading(false)})
  }, [page, searchText])
  
  const onLoadMore = () => {
        setPage(page + 1)
  };

  const handleFormSubmit = (searchText) => {
    setSearchText(searchText);
    setImages([]);
    setPage(1);
  };

  const showModal = (modalImg) => {
    setIsShowModal(true);
    setModalImg(modalImg);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };
    
    return (
      <div className={css.app}>
        <Searchbar
          onSubmit={handleFormSubmit}/>
        {error && <div>{error.message}</div>}
        {images.length > 0 ? <ImageGallery
          images={images}
          showModal={showModal} /> : <h1>Enter something</h1>}
        {isLoading && <Loader />}
        {(images.length > 0 && !isLoading) && <Button onClick={onLoadMore} />}
        {isShowModal && <Modal modalImg={modalImg} onClose={closeModal} />}
      </div>
    )
};

export default App;


