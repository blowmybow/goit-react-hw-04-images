import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import * as API from '../Api/Api';
import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Text } from './App.styled';
import { notifyOptions } from '../utils/notify/NotifyOptions';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (searchName === '') {
      return;
    }
    async function addImages() {
      try {
        setIsLoading(true);
        const data = await API.getImages(searchName, currentPage);
        if (data.hits.length === 0) {
          return toast.error('Sorry image not found...', notifyOptions);
        }
        const normalizedImages = API.normalizedImages(data.hits);
        setImages(images => [...images, ...normalizedImages]);
        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevSate => prevSate + 1);
  };
  const handleSearchSubmit = query => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <Text>
          Hello, you are welcome to search for pictures with help Pixabay API
        </Text>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
      <ToastContainer />
    </div>
  );
}
