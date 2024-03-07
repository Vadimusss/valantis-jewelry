import {
  useEffect, useState, useCallback, useRef,
} from 'react';
import uniqBy from 'lodash.uniqby';
import { getTotalPageCount, getDisplayedProductIds } from '../utils.ts';
import Form from './Form.tsx';
import Pagination from './Pagination.tsx';

type AppProps = {
  apiUrl: string;
  authString: string;
  maxProductsOnPage: number;
};

type Product = {
  brand: string | null;
  id: string;
  price: number;
  product: string;
};

type RequestBodyState = {
  action: string;
  params?: {
    offset?: number;
    limit?: number;
    ids?: string[];
    field?: string;
    product?: string;
    price?: number;
    brand?: string;
  }
};

function App(props: AppProps) {
  const { apiUrl, authString, maxProductsOnPage } = props;

  const [productIds, setProductIds] = useState<string[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [requestBodyState, setRequestBodyState] = useState<RequestBodyState>({ action: 'get_ids' });
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'X-Auth': authString,
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(requestBodyState),
        });

        const { result } = await response.json();

        setProductIds([...new Set(result)] as string[]);
        setCurrentPage(1);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err instanceof Error ? err.message : 'Unknown Api Error');

        setProductIds([]);
        setTimeout(fetchData, 1000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, authString, requestBodyState]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'X-Auth': authString,
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            action: 'get_items',
            params: { ids: getDisplayedProductIds(productIds, maxProductsOnPage, currentPage) },
          }),
        });

        const { result } = await response.json();
        setDisplayedProducts(uniqBy(result as Product[], 'id'));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err instanceof Error ? err.message : 'Unknown Api Error');

        setDisplayedProducts([]);
        setTimeout(fetchData, 1000);
      } finally {
        setLoading(false);
      }
    };

    if (isMounted.current) {
      fetchData();
    } else {
      isMounted.current = true;
    }
  }, [productIds, currentPage, apiUrl, authString, maxProductsOnPage]);

  const handleNextPageClick = useCallback(() => {
    const current = currentPage;
    const next = current + 1;
    const total = productIds ? getTotalPageCount(productIds.length, maxProductsOnPage) : current;

    setCurrentPage(next <= total ? next : current);
  }, [currentPage, productIds, maxProductsOnPage]);

  const handlePrevPageClick = useCallback(() => {
    const current = currentPage;
    const prev = current - 1;

    setCurrentPage(prev > 0 ? prev : current);
  }, [currentPage]);

  return (
    <div>
      <Form setRequestBodyState={(newState) => setRequestBodyState(newState)} />
      {isLoading && 'Loading...'}
      {!displayedProducts && 'no data'}
      {(displayedProducts && !isLoading) && (
        <>
          <ul>
            {displayedProducts
              .map(({
                brand, id, price, product,
              }) => (
                <li key={id}>{`${id} - ${brand} - ${price} - ${product}`}</li>
              ))}
          </ul>
          <Pagination
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: currentPage === 1,
              right: currentPage === getTotalPageCount(productIds.length, maxProductsOnPage),
            }}
            nav={{
              current: currentPage,
              total: getTotalPageCount(productIds.length, maxProductsOnPage),
            }}
          />
        </>
      )}
    </div>
  );
}

export default App;
