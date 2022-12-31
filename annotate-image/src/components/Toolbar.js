import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';

function Toolbar({ pushAnnName, pushClearAll, pushSelectorType, pushDisplayLabels }) {

  const [annName, setAnnName] = useState('');
  const [clearAll, setClearAll] = useState(false);
  const [selectorType, setSelectorType] = useState('RECTANGLE');
  var activeColor = 'rgb(50,50,50)'
  var buttonColor = 'rgb(37,37,37)'

  useEffect(() => {
    pushSelectorType(selectorType);
  }, [selectorType]);

  const clearAnnotations = () => {
    setClearAll(!clearAll)
    pushClearAll(!clearAll)
  }

  return (
    <div className='toolbar'>
      <label htmlFor='recatngle' id='rectangle-btn'><button id='rectangle' className='selector-button' style={{ backgroundColor: selectorType === 'RECTANGLE' ? activeColor : buttonColor }}
        onClick={() => { setSelectorType('RECTANGLE') }}><i className='far fa-square' style={{ color: selectorType === 'RECTANGLE' ? 'white' : 'darkgrey', fontSize: '24px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto' }}></i>

      </button>Rectangle</label>

      <label htmlFor='point' id='polygon-btn'><button className='selector-button' id='point' style={{ backgroundColor: selectorType === 'POINT' ? activeColor : buttonColor }}
        onClick={() => { setSelectorType('POINT') }}><i className='	far fa-dot-circle' style={{ color: selectorType === 'POINT' ? 'white' : 'darkgrey', fontSize: '24px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto' }}></i></button>Point</label>

      <label htmlFor='oval' id='smart-btn'><button className='selector-button' id='oval' style={{ backgroundColor: selectorType === 'OVAL' ? activeColor : buttonColor }}
        onClick={() => { setSelectorType('OVAL') }}><i className='far fa-circle' style={{ color: selectorType === 'OVAL' ? 'white' : 'darkgrey', fontSize: '24px', marginTop: '3px', marginLeft: 'auto', marginRight: 'auto' }}></i></button>Oval</label>

      <hr />
      <Popup trigger={<label htmlFor='name-btn'><button id='name-btn'><i className='fas fa-pencil-alt' style={{ color: 'darkgrey', fontSize: '24px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto' }}></i></button>Name</label>} position="right center">
        {close => (
          <div className='popup'>
            <label htmlFor='ann-name'>Enter annotations name:</label>
            <input type='text' id='ann-name' maxLength='12' onChange={(e) => setAnnName(e.target.value)}></input>
            <button className='set-name-btn' onClick={() => {
              close()
              pushAnnName(annName)
            }}
            >Set Name</button>
          </div>
        )}
      </Popup>
      <hr />
      <label htmlFor='clear-all' id='clear-btn'><button id='clear-all' onClick={clearAnnotations}><i className='fas fa-eraser' style={{ color: 'darkgrey', fontSize: '24px', marginTop: '3px', marginLeft: 'auto', marginRight: 'auto' }}></i></button>Clear All</label>
      <hr />
      <label htmlFor='labels-btn' id='labels-btn'><button id='labels-btn' onClick={() => { pushDisplayLabels(Math.random) }}><i className='fas fa-columns' style={{ color: 'darkgrey', fontSize: '24px', marginTop: '3px', marginLeft: 'auto', marginRight: 'auto' }}></i></button>Labels</label>
    </div>
  )
}

export default Toolbar