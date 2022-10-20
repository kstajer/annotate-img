import './App.css';
import {useState} from 'react'
import Navbar from './Navbar.js'
import Labels from './Labels.js'
import Footer from './Footer.js'
import Workspace from './Workspace.js'

import './Navbar.css'
import './Labels.css'
import './Footer.css'
import './Workspace.css'

function App() {

  const [imgNames, setImgNames]=useState([])

  const getImgNames=(data)=>{
    setImgNames(data)
  }

  return (
    <div className="App">
      <Navbar getImgNames={getImgNames}/>
      <div className='labels-workspace'>
        <Labels />
        <Workspace imgNames={imgNames}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
