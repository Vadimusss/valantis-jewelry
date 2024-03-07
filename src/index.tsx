import MD5 from 'crypto-js/md5';
import ReactDOM from 'react-dom/client';
import { getFormatedUtcDate } from './utils.ts';
import './scss/index.scss';
import App from './components/App.tsx';

const apiUrl = 'http://api.valantis.store:40000/';
const password = 'Valantis';
const authString = MD5(`${password}_${getFormatedUtcDate()}`).toString();
const maxProductsOnPage = 50;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <App apiUrl={apiUrl} authString={authString} maxProductsOnPage={maxProductsOnPage} />,
);
