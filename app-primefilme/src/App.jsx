import { ToastContainer } from 'react-toastify';
import { FilmesProvider } from './context/FilmesContext';
import AppRoutes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <FilmesProvider>
      <div className="App">
        <ToastContainer autoClose={3000} />
        <AppRoutes />
      </div>
    </FilmesProvider>
  );
}

export default App;
