function Pagination(props: PaginationProps) {
  const {
    nav, disable, onNextPageClick, onPrevPageClick,
  } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
        className="btn btn-primary btn-sm"
      >
        {'<'}
      </button>
      {nav && (
        <span className="mx-2">
          {nav.current}
          {' '}
          /
          {nav.total}
        </span>
      )}
      <button
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
        className="btn btn-primary btn-sm"
      >
        {'>'}
      </button>
    </div>
  );
}

Pagination.defaultProps = {
  nav: null,
};

export default Pagination;
