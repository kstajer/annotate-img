import './App.css';
import { useState, useEffect } from 'react'
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
  const [annName, setAnnName] = useState('')
  const [clearAll, setClearAll] = useState()
  const [selectorType, setSelectorType] = useState('RECTANGLE')
  const [currentImgID, setCurrentImgID] = useState()
  const [imgDimensions, setImgDimensions] = useState({})
  const [download, setDownload] = useState()
  const [displayLabels, setDisplayLabels] = useState(true)
  const [inputCoco, setInputCoco] = useState()

  const getImgNames = (data) => {
    setImgNames(data)
  }

  const getAnnName = (name) => {
    setAnnName(name)
  }

  const pullDownload = (data) => {
    setDownload(data)
  }

  const pullInputCoco = (data) => {
    setInputCoco(data)
  }

  const getClearAll = (data) => {
    setClearAll(data)
  }

  const getSelectorType = (selector) => {
    setSelectorType(selector)
  }

  const getImgDimensions = (dimensions) => {
    setImgDimensions(dimensions)
  }

  const getCurrentImgID = (id) => {
    setCurrentImgID(id)
  }

  const getDisplayLabels = (data) => {
    setDisplayLabels(data)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar
                getImgNames={getImgNames}
                pullDownload={pullDownload}
                pullInputCoco={pullInputCoco}
              />
              <div className='labels-workspace'>
                <Toolbar
                  pushAnnName={getAnnName}
                  pushClearAll={getClearAll}
                  pushSelectorType={getSelectorType}
                  pushDisplayLabels={getDisplayLabels}
                />
                <Workspace
                  imgNames={imgNames}
                  annName={annName}
                  clearAll={clearAll}
                  selectorType={selectorType}
                  getImgDimensions={getImgDimensions}
                  getCurrentImgID={getCurrentImgID}
                  downloadForm={download}
                  displayLabels={displayLabels}
                  inputCoco={inputCoco}
                />
              </div>
              <Footer
                imgDimensions={imgDimensions}
                imgNames={imgNames}
                currentImgID={currentImgID}
              />
            </>
          } />
          <Route path="/labels" element={<Labels />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
