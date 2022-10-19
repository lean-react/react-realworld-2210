import axios from 'axios';
import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

export function useResource<T>(key: string) {
  const { data, error } = useSWR<T[]>(key, (key) =>
    axios
      .get(`https://rube-servidor.netlify.app/api/public/${key}`)
      .then((res) => res.data)
  );

  const isLoading = !error && !data;

  const invalidate = useCallback(() => mutate(key), [key]);

  return { data, isLoading, error, invalidate };
}
