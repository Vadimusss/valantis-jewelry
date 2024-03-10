
type PaginationProps = {
    onNextPageClick: () => void;
    onPrevPageClick: () => void;
    disable: {
      left: boolean;
      right: boolean;
    };
    nav?: {
      current: number;
      total: number;
    };
  };