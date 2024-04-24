
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Nav from './components/Nav';
import New from './components/New';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      {/* <Nav/>
      <Admin/>
       */}
      <Routes>
      <Route path='/' element={<><Nav/><Admin/></>}/>
        <Route path='New' element={<><New/><Admin/></>}/>
        <Route path='Update' element={<><New/><Update/></>}/>
      </Routes>
    </div>
  );
}

export default App;
