import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';

function Navbar({ getImgNames, pullDownload }) {

  const [selectedFiles, setSelectedFiles] = useState(null)
  const [imgNames, setImgNames] = useState([])
  const [downloadIsClicked, setDownloadIsClicked] = useState(false)
  const [datasetName, setDatasetName] = useState();
  const [contributorName, setContributorName] = useState();
  const [versionName, setVersionName] = useState();

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
    pullDownload({dataset: datasetName, contributor: contributorName, version: versionName, clicked: downloadIsClicked})
    setDatasetName('')
    setContributorName('')
    setVersionName('')
  }

  return (
    <div className='navbar'>
      <div className='upload-div'>
        <label htmlFor="upload-btn" className="custom-file-upload" id='upload-btn-label'>
          Upload</label>
        <input type='file' accept="image/png, image/jpg, image/jpeg" id='upload-btn' name='file' multiple onChange={handleFileChange}></input>
      </div>
      <Popup trigger={<button className='download-btn' >Download</button>} modal>
        {close => (
        <div className='popup-download'>
          <label htmlFor='dataset-name'>Dataset name:</label>
          <input type='text' id='dataset-name' maxLength='32' onChange={(e) => {setDatasetName(e.target.value)}}></input>
          <label htmlFor='contributor-name'>Contributor:</label>
          <input type='text' id='contributor-name' maxLength='24' onChange={(e) => {setContributorName(e.target.value)}}></input>
          <label htmlFor='version'>Version:</label>
          <input type='text' id='version' maxLength='12' onChange={(e) => {setVersionName(e.target.value)}}></input>
          <button className='submit-download' onClick={() => {
            downloadClicked()
            close()
            }}
            >Download</button>
        </div>
        )}
      </Popup>
    </div>
  )
}

export default Navbar