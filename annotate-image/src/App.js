import './App.css';
import {useState} from 'react'
import Toolbar from './Toolbar.js'
import Labels from './Labels.js'
import Footer from './Footer.js'
import Workspace from './Workspace.js'
import Navbar from './Navbar'

import './Toolbar.css'
import './Labels.css'
import './Footer.css'
import './Workspace.css'
import './Navbar.css'

function App() {

  const [imgNames, setImgNames]=useState([])

  const getImgNames=(data)=>{
    setImgNames(data)
  }

  return (
    <div className="App">
      <Navbar/>
      <div className='labels-workspace'>
        {/* <Labels /> */}
        <Toolbar getImgNames={getImgNames}/>
        <Workspace imgNames={imgNames}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
