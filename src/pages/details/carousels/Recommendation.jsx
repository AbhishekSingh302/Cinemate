import React from 'react';
import Carousel from '../../../components/carousel/Carousel';
import { useFetch } from '../../../hooks/useFetch';

const Recommendation = ({mediaType, id}) => {

    const{data, loading, error} = useFetch(`/${mediaType}/${id}/recommendations`);

    const title = 'Recommendations';

  return (
    <Carousel data={data?.results} loading={loading} endpoint={mediaType} title={title}/>
  )
}

export default Recommendation
