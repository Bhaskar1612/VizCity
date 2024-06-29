import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Home from './Component/Home';
import UserProfile from './Component/UserProfile'
import CreateMember from './Component/CreateMember';
import Weatherapi from './Component/Weatherapi';
import Navigation from './Component/Navigation';
import Translate from './Component/Translate';
import News from './Component/News';
import Exchange from './Component/Exchange';
import Timezone from './Component/Timezone';
import Covid from './Component/Covid';

function App(){
  
  return (
    
    <div className="background-container">
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Component/Login' element={<Login/>} />
        <Route path='/Component/CreateMember' element={<CreateMember/>} />
        <Route path='/Component/UserProfile' element={<UserProfile/>} />
        <Route path='/Component/Weatherapi' element={<Weatherapi/>} />
        <Route path='/Component/Navigation' element={<Navigation/>} />
        <Route path='/Component/Translate' element={<Translate/>}/>
        <Route path='/Component/News' element={<News/>}/>
        <Route path='/Component/Exchange' element={<Exchange/>}/>
        <Route path='/Component/Timezone' element={<Timezone/>}/>
        <Route path='/Component/Covid' element={<Covid/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
