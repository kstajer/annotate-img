import React, { useState, useEffect } from 'react'

function Navbar({ getImgNames }) {

  const [selectedFiles, setSelectedFiles] = useState(null)
  const [imgNames, setImgNames] = useState([])

  useEffect(() => {
    if (selectedFiles) {
      handleSubmit(selectedFiles);
    }
  }, [selectedFiles]);

  useEffect(() => {
    console.log(imgNames)
    getImgNames(imgNames)
  }, [imgNames]);

  const handleSubmit = async (event) => {
    const data = new FormData()
    for (var x = 0; x < selectedFiles.length; x++) {
      data.append('file', selectedFiles[x])
      getImgName(selectedFiles[x], imgNames.length + x)
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
    setImgNames(imgNames => [...imgNames, { id: x, name: decodeURIComponent(imgData.name) }])
  }

  return (
    <div className='navbar'>
      <div className='upload-div'>
        <label htmlFor="upload-btn" className="custom-file-upload" id='upload-btn-label'>
          Upload</label>
        <input type='file' accept="image/png, image/jpg, image/jpeg" id='upload-btn' name='file' multiple onChange={handleFileChange}></input>
      </div>
      <button className='download-btn'>Download</button>
    </div>
  )
}

export default Navbar