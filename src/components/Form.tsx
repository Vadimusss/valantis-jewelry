/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';
import { validate } from '../utils.ts';

function Form({ setRequestBodyState }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ product, price, brand }) => {
    setRequestBodyState({
      action: 'filter',
      params: {
        ...(product && { product }),
        ...(price && { price: Number(price) }),
        ...(brand && { brand }),
      },
    });
    reset();
  };

  const onClick = () => {
    setRequestBodyState({ action: 'get_ids' });
    reset();
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gx-5">
          <div className="col-md-4 pt-2">
            <div className="mb-2">
              <input
                type="text"
                className="form-control-sm form-control"
                placeholder="Товар"
                defaultValue=""
                {...register('product', { validate })}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control-sm form-control"
                placeholder="Цена"
                defaultValue=""
                {...register('price', { validate })}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control-sm form-control"
                placeholder="Бренд"
                defaultValue=""
                {...register('brand', { validate })}
              />
            </div>
          </div>
        </div>
        <div className="col">
          {(errors.product || errors.price || errors.brand)
            && <span>Заполните хотя бы одно поле!</span>}
        </div>
        <div className="col-md-4">
          <input type="submit" className="me-2 btn btn-primary btn-sm" value="Фильтровать" />
          <input type="button" className="btn btn-primary btn-sm" value="Сброс" onClick={onClick} />
        </div>
      </form>
    </div>
  );
}

export default Form;
