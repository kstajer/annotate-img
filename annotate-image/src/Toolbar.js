import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';



function Toolbar({pushAnnName, pushClearAll, pushSelectorType}) {

  const [annName, setAnnName] = useState('');
  const [clearAll, setClearAll] = useState(false);
  const [selectorType, setSelectorType] = useState('RECTANGLE');
  var activeColor= 'rgb(145,145,145)'
  var buttonColor= 'rgb(50,50,50)'

  useEffect(() => {
    console.log(annName);
  }, [annName]);

  useEffect(() => {
    pushSelectorType(selectorType);
  }, [selectorType]);

  const clearAnnotations = () => {
    setClearAll(!clearAll)
    pushClearAll(!clearAll)
  }

  return (
    <div className='toolbar'>

      <button id='rectangle'  style={{backgroundColor: selectorType==='RECTANGLE' ? activeColor : buttonColor}} 
      onClick={() => { setSelectorType('RECTANGLE')}}>
      </button>
      <label htmlFor='recatngle' id='rectangle-btn'>Rectangle</label>
      <button id='point' style={{backgroundColor: selectorType==='POINT' ? activeColor : buttonColor}}
      onClick={() => { setSelectorType('POINT')}}></button>
      <label htmlFor='point' id='polygon-btn'>Point</label>
      <button id='oval' style={{backgroundColor: selectorType==='OVAL' ? activeColor : buttonColor}}
      onClick={() => { setSelectorType('OVAL')}}></button>
      <label htmlFor='oval' id='smart-btn'>Oval</label>

      <hr />
      <Popup trigger={<label htmlFor='name-btn'><button id='name-btn'></button>Name</label>} position="right center">
        {close => (
        <div className='popup'>
          <label htmlFor='ann-name'>Enter annotations name:</label>
          <input type='text' id='ann-name' maxLength='12' onChange={(e) => setAnnName(e.target.value)}></input>
          <button className='set-name-btn' onClick={() => {
            close()
            pushAnnName(annName)
            }}>Set Name</button>
        </div>
        )}
      </Popup>
      <hr />
      <button id='clear-all' onClick={clearAnnotations}></button>
      <label htmlFor='clear-all' id='clear-btn'>Clear All</label>
      <hr />
      <button id='labels-btn'></button>
      <label htmlFor='labels-btn' id='tbd-btn'>Labels</label>
    </div>
  )
}

export default Toolbar