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
  
  type FormProps = {
    setRequestBodyState: React.Dispatch<React.SetStateAction<RequestBodyState>>;
  };
  
  type Inputs = {
    product: string;
    price: string;
    brand: string;
  }
  