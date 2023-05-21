import { Component } from "react";
import Notiflix from 'notiflix';
import { getImages } from "services/getImages";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Modal from 'components/Modal/Modal';
import css from './App.module.css'

class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    isLoading: false,
    isShowModal: false,
    modalImg: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchText, page } = this.state;
        if (prevState.searchText !== searchText
            || prevState.page !== page) {
            
             this.setState({ isLoading: true });

        getImages(searchText, page)
            .then(data => {
                if (data.hits.length === 0) {
                    Notiflix.Notify.failure('There are no images...');
                }

                return this.setState(prevState => ({
                  images: [...prevState.images, ...data.hits] ,
          }));
            })
            .catch(error => this.setState({ error }))
            .finally(() => {this.setState({ isLoading: false })})
        }
  };
  
  onLoadMore = () => {
        this.setState(prevState => {
            return { page: prevState.page + 1 }
        })
    };

  handleFormSubmit = (searchText) => {
    this.setState({
      searchText,
      images: [],
      page: 1,      
    })
  }

  showModal = (modalImg) => {
    this.setState({ isShowModal: true, modalImg })
  };

  closeModal = () => {
    this.setState({ isShowModal: false })
  };

  clearImageGallery = () => {
    this.setState({ images: [], page: 1 })
  };

  render() {
    const { images, page, isShowModal, modalImg, error, isLoading } = this.state;

    
    return (
      <div className={css.app}>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          resetPage={page}
          resetGallery={images} />
        {error && <div>{error.message}</div>}
        {images.length > 0 ? <ImageGallery
          images={images}
          showModal={this.showModal} /> : <h1>Enter something</h1>}
        {isLoading && <Loader />}
        {(images.length > 0 ) && <Button onClick={this.onLoadMore} />}
        {isShowModal && <Modal modalImg={modalImg} onClose={this.closeModal} />}
      </div>
    )
    
  }
};

export default App;


