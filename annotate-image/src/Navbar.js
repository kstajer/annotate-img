import React from 'react'
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { asUploadButton } from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";

const DivUploadButton = asUploadButton((props) => {
  return <div {...props} style={{ cursor: "pointer" }}>
      <label id='upload-btn'><button className='upload-btn' ></button>Upload</label>
  </div>
});

function Navbar() {
  return (
    <div className='navbar'>
        
        <Uploady 
        multiple
        destination={{ }}>
          <DivUploadButton/>
        </Uploady>
        <label id='download-btn'><button className='download-btn'></button>Download</label>
        <label id='rectangle-btn'><button></button>Rectangle</label>
        <label id='polygon-btn'><button></button>Polygon</label>
        <label id='smart-btn'><button></button>Smart</label>
        <label id='name-btn'><button></button>Name</label>
        <label id='clear-btn'><button></button>Clear All</label>
        <label id='tbd-btn'><button></button>tbd</label>
        <label id='tbd2-btn'><button></button>tbd</label>

    </div>
  )
}

export default Navbar