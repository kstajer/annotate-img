import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';



function Toolbar({pushAnnName, pushClearAll, pushSelectorType}) {

  const [annName, setAnnName] = useState('');
  const [clearAll, setClearAll] = useState(false);
  const [selectorType, setSelectorType] = useState('RECTANGLE');

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
      <label id='rectangle-btn'><button onClick={() => { setSelectorType('RECTANGLE')}}></button>Rectangle</label>
      <label id='polygon-btn'><button onClick={() => { setSelectorType('POINT')}}></button>Point</label>
      <label id='smart-btn'><button onClick={() => { setSelectorType('OVAL')}}></button>Oval</label>
      <hr />
      <Popup trigger={<label id='name-btn'><button></button>Name</label>} position="right center">
        {close => (
        <div>
          <label htmlFor='ann-name'>Enter annotation name:</label>
          <input type='text' name='ann-name' onChange={(e) => setAnnName(e.target.value)}></input>
          <button onClick={() => {
            close()
            pushAnnName(annName)
            }}>Submit</button>
        </div>
        )}
      </Popup>
      <hr />
      <label id='clear-btn'><button onClick={clearAnnotations}></button>Clear All</label>
      <hr />
      <label id='tbd-btn'><button onClick={() => {
        var w = window.open('http://localhost:3000/labels', 'Data', 'height=400,width=300')
      }}>
      </button>Labels</label>
      <label id='tbd2-btn'><button></button>tbd</label>
    </div>
  )
}

export default Toolbar