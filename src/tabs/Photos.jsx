import { getPhotos } from 'apiService/photos';
import { Text, Form, PhotosGallery, Loader } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isError, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [isVisible, setVisible] = useState(false);


  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      setLoading(true);
      try {
        const {photos, per_page, total_results
        } = await getPhotos(query, page);
        if (!photos.length) {
          return setEmpty(true)
        }
        setImages(prevImages => [...prevImages, ...photos])
        setVisible(page < Math.ceil(total_results/per_page))
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

    }
    getImages();
  }, [page, query]
    
  );

  const onHandelSubmit = searchQuery => 
  {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <Form onSubmit={onHandelSubmit} />     
      {images.length>0 && <PhotosGallery images={images}/>} 
      {!images.length && !isEmpty && <Text textAlign="center">Let`s begin search 🔎</Text>}
      {isLoading && <Loader/>}
      {isError && <Text textAlign="center">❌ Something went wrong - {isError}</Text>}
      {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}


    </>
  );
};
