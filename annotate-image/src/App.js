import './App.css';
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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

  const [imgNames, setImgNames] = useState([])
  const [allAnnotations, setAllAnnotations] = useState([])

  const getImgNames = (data) => {
    setImgNames(data)
  }

  const getAllAnnotations = (data) => {
    setAllAnnotations(data)
    console.log('pulluje')
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar getImgNames={getImgNames} />
              <div className='labels-workspace'>
                <Toolbar />
                <Workspace imgNames={imgNames} />
              </div>
              <Footer />
            </>
          } />
          <Route path="/labels" element={<Labels />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
