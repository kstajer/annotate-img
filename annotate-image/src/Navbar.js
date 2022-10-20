import React, { useState, useEffect } from 'react'

function Navbar({getImgNames}) {

  const [selectedFiles, setSelectedFiles]= useState(null)
  const [imgNames, setImgNames]= useState([])

  useEffect(() => {
    if(selectedFiles){
    handleSubmit(selectedFiles); 
    }
  }, [selectedFiles]);

  useEffect(() => {
    console.log(imgNames)
    getImgNames(imgNames)
  }, [imgNames]);

  const handleSubmit = async (event) => {
    const data = new FormData()
    for(var x = 0; x < selectedFiles.length; x++) {
        data.append('file', selectedFiles[x])
        getImgName(selectedFiles[x], imgNames.length+x)
    }

    const response = await fetch('http://localhost:4000/image', {
      method: 'POST',
      body: data,
      
    })
    if (response) console.log(response.statusText)
  }

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files)
  }

  const getImgName = (imgData, x) => {
    setImgNames(imgNames => [...imgNames, {id: x, name: decodeURIComponent(imgData.name)}])
  }

  return (
    <div className='navbar'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="upload-btn" className="custom-file-upload" id='upload-btn-label'>
          </label>
          <label htmlFor="upload-btn-label" className="upload-label">
           Upload
          </label>
          <input type='file' accept="image/png, image/jpg, image/jpeg" id='upload-btn' name='file' multiple onChange={handleFileChange}></input>
        </form>

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