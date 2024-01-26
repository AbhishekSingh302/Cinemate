import React from 'react';
import Carousel from '../../../components/carousel/Carousel';
import { useFetch } from '../../../hooks/useFetch';

const Similar = ({mediaType, id}) => {

    const{data, loading, error} = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === 'tv' ? "Similar Tv Shows" : "Similar Movies";

  return (
    <Carousel data={data?.results} loading={loading} endpoint={mediaType} title={title}/>
  )
}

export default Similar
