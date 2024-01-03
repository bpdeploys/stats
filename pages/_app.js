import { ToastContainer } from 'react-toastify';
import FormProvider from '../services/context';
import localFont from 'next/font/local';
import '../styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SquadProvider } from '../context/SquadContext';
import TeamCreationProvider from '../context/TeamContext';
import UserProvider from '../context/UserContext';

// Font files can be colocated inside of `pages`
const futuraBook = localFont({ src: '../public/assets/fonts/futura-book.ttf' });

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <FormProvider>
        <TeamCreationProvider>
          <SquadProvider>
            <ToastContainer />
            <main className={futuraBook.className}>
              <Component {...pageProps} />
            </main>
          </SquadProvider>
        </TeamCreationProvider>
      </FormProvider>
    </UserProvider>
  );
}

export default MyApp;
