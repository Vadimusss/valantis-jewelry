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