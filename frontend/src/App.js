import logo from './logo.svg';
import Entry from './components/loginPage/Entry'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Entry />
    </>
  );
}

export default App;
