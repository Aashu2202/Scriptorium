import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Entry from "./components/Entry";
import Collaborate from './components/Collaborate';
import './components/Collaborate.css';
import './components/Entry.css';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  
  return (
    <>
      <div>
        <Toaster position='top-right'>
        </Toaster>
      </div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Entry/>} />
            <Route path='/Collaborate/:roomID' element={<Collaborate/>}  />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
