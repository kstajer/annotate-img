import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';



function Toolbar({pushAnnName}) {

  const [annName, setAnnName] = useState('');

  useEffect(() => {
    console.log(annName);
  }, [annName]);

  return (
    <div className='toolbar'>
      <label id='rectangle-btn'><button></button>Rectangle</label>
      <label id='polygon-btn'><button></button>Polygon</label>
      <label id='smart-btn'><button></button>Smart</label>
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
      <label id='clear-btn'><button></button>Clear All</label>
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