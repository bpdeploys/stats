import { ToastContainer } from 'react-toastify';
import FormProvider from '../services/context';
import localFont from 'next/font/local';
import '../styles.scss';
import 'react-toastify/dist/ReactToastify.css';

// Font files can be colocated inside of `pages`
const futuraBook = localFont({ src: '../public/assets/fonts/futura-book.ttf' });

function MyApp({ Component, pageProps }) {
  return (
    <FormProvider>
      <ToastContainer />
      <main className={futuraBook.className}>
        <Component {...pageProps} />
      </main>
    </FormProvider>
  );
}

export default MyApp;
