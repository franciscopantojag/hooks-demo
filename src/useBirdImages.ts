import { useEffect, useState } from 'react';
import getBirdImages from './utils/getBirdImages';
import { useQuery } from 'react-query';

const timer = async (t = 500) => new Promise((res) => setTimeout(res, t));

export const useBirdImages = () => {
  const [birdImages, setBirdImages] = useState<undefined | string[]>();
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const main = async () => {
      setIsloading(true);
      const [birds] = await Promise.all([getBirdImages(), timer()]);
      if (!birds) {
        setHasError(true);
        setIsloading(false);
        return;
      }
      setBirdImages(birds);
      setIsloading(false);
    };
    main();
  }, []);
  return { data: birdImages, isLoading, hasError };
};

export const useQueryImages = () => {
  const query = useQuery('birdImages', async () => {
    const [images] = await Promise.all([getBirdImages(), timer()]);
    return images;
  });
  return query;
};
