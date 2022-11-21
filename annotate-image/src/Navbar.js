import React, { useState, useEffect } from 'react'

function Navbar({ getImgNames, pullDownload }) {

  const [selectedFiles, setSelectedFiles] = useState(null)
  const [imgNames, setImgNames] = useState([])
  const [downloadIsClicked, setDownloadIsClicked] = useState(false)

  useEffect(() => {
    if (selectedFiles) {
      handleSubmit(selectedFiles);
    }
  }, [selectedFiles]);

  useEffect(() => {
    getImgNames(imgNames)
    console.log(imgNames)
  }, [imgNames]);

  const handleSubmit = async (event) => {
    const data = new FormData()
    const acceptedExtensions = ['jpg', 'jpeg', 'png', 'svg']
    for (var x = 0; x < selectedFiles.length; x++) {
      var extension = selectedFiles[x].name.split('.')[1]
      if (acceptedExtensions.includes(extension)) {
        data.append('file', selectedFiles[x])
        getImgName(selectedFiles[x], imgNames.length + x)
      }
      else {
        console.log("File: " + selectedFiles[x].name + " has forbidden extension.")
      }
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
    setImgNames(imgNames => [...imgNames, { id: x, name: decodeURIComponent(imgData.name), annotations: [] }])
  }

  const downloadClicked = () => {
    setDownloadIsClicked(!downloadIsClicked)
    pullDownload(downloadIsClicked)
  }

  return (
    <div className='navbar'>
      <div className='upload-div'>
        <label htmlFor="upload-btn" className="custom-file-upload" id='upload-btn-label'>
          Upload</label>
        <input type='file' accept="image/png, image/jpg, image/jpeg" id='upload-btn' name='file' multiple onChange={handleFileChange}></input>
      </div>
      <button className='download-btn' onClick={downloadClicked}>Download</button>
    </div>
  )
}

export default Navbar