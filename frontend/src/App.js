
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css//bootstrap.min.css';
import Header from './component/header/Header';
import Login from './component1/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
      <Routes> 
        <Route element={ <Login/>} path='/'/> 
        <Route element={<Header/>} path='/dashborad'/>
      </Routes>
      {/* <Header/> */}
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
