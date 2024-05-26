// import { getPhotos } from 'apiService/photos';
import { Text, Form } from 'components';
import { useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const onHandelSubmit = searchQuery => setQuery(searchQuery);

  return (
    <>
      <Text textAlign="center">Let`s begin search 🔎</Text>
      <Form onSubmit={onHandelSubmit} />
    </>
  );
};
