import { useEffect, useState } from 'react';

interface Response {
  area: number,
  flag: string,
  independent: boolean,
  name: string,
  region: string,
}

function isAbortError(error: unknown): error is DOMException {
  let name = 'Unknown Name';
  if (error instanceof Error) name = error.name;

  if (error && name === 'AbortError') {
    return true;
  }
  return false;
}

const useFetch = (url: string) => {
  const [response, setResponse] = useState<Response[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);

    (async () => {
      try {
        const resp = await fetch(url, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
          signal: abortController.signal,
        });

        const dataInJs = await resp.json();

        if (!resp.ok) throw new Error(dataInJs.message);

        setResponse(dataInJs);
        setIsLoading(false);
      } catch (err) {
        if (isAbortError(err)) {
          return;
        }

        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message;
        setError(message);
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { response, error, isLoading };
};

export default useFetch;
