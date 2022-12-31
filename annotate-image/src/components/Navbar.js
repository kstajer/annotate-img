import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import cocoIcon from '../coco-upload-icon.png'

function Navbar({ getImgNames, pullDownload, pullInputCoco }) {

  const [selectedFiles, setSelectedFiles] = useState(null)
  const [imgNames, setImgNames] = useState([])
  const [downloadIsClicked, setDownloadIsClicked] = useState(false)
  const [datasetName, setDatasetName] = useState();
  const [contributorName, setContributorName] = useState();
  const [versionName, setVersionName] = useState();
  const [disableUpload, setDisableUpload] = useState(true);
  const [inputCoco, setInputCoco] = useState("");

  useEffect(() => {
    if (selectedFiles) {
      handleSubmit(selectedFiles);
    }
  }, [selectedFiles]);

  useEffect(() => {
    getImgNames(imgNames)
    if (imgNames.length > 0) {
      setDisableUpload(false)
    }
  }, [imgNames]);

  useEffect(() => {
    pullInputCoco(inputCoco)
  }, [inputCoco]);

  const handleCocoChange = e => {
    const fileReader = new FileReader();
    if (e.target.files[0].name.split('.')[1] == 'json') {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        setInputCoco(e.target.result);
      };
    }
    else {
      console.log("File: " + e.target.files[0].name + " has forbidden extension.")
    }
  };

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
    if (response) {
      console.log(response.statusText)
    }
  }

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files)
  }

  const getImgName = (imgData, x) => {
    setImgNames(imgNames => [...imgNames, { id: x, name: decodeURIComponent(imgData.name), annotations: [], dimensions: { height: 0, width: 0 } }])
  }

  const downloadClicked = () => {
    setDownloadIsClicked(!downloadIsClicked)
    pullDownload({ dataset: datasetName, contributor: contributorName, version: versionName, clicked: downloadIsClicked })
    setDatasetName('')
    setContributorName('')
    setVersionName('')
  }

  return (
    <div className='navbar'>
      <p className='navbar-title'>Annotate Images</p>
      <div className='upload-div'>
        <label htmlFor="upload-btn" className="custom-file-upload" id='upload-btn-label'>
          <i className='fas fa-upload' style={{ color: 'lightgrey', fontSize: '18px', marginTop: '6px', marginLeft: '-10px', marginRight: '8px' }}></i>Upload</label>
        <input type='file' accept="image/png, image/jpg, image/jpeg" id='upload-btn' name='file' multiple onChange={handleFileChange}></input>
      </div>

      <div className='upload-coco-div'>
        <label htmlFor="coco-btn" className="custom-file-upload"
          id={disableUpload ? 'upload-coco-label-disabled' : 'upload-coco-label'}><div className='upload-text-icon'><img src={cocoIcon} className={disableUpload ? 'coco-icon-disabled' : 'coco-icon'} /><div className='upload-coco-text'>Upload COCO</div></div></label>
        <input disabled={disableUpload} type='file' id='coco-btn' name='coco-btn' onChange={handleCocoChange}></input>
      </div>

      <Popup className='download-pop' trigger={<button className='download-btn' ><i className='fas fa-download' style={{ color: 'rgb(37,37,37)', fontSize: '18px', marginTop: '3px', marginLeft: '-10px', marginRight: '8px' }}></i>Download</button>} modal>
        {close => (
          <div className='popup-download'>
            <label htmlFor='dataset-name'>Dataset name:</label>
            <input type='text' id='dataset-name' className='form-input' maxLength='24' onChange={(e) => { setDatasetName(e.target.value) }}></input>
            <label htmlFor='contributor-name'>Contributor:</label>
            <input type='text' id='contributor-name' className='form-input' maxLength='24' onChange={(e) => { setContributorName(e.target.value) }}></input>
            <label htmlFor='version'>Version:</label>
            <input type='text' id='version' className='form-input' maxLength='12' onChange={(e) => { setVersionName(e.target.value) }}></input>
            <button className='submit-download' onClick={() => {
              downloadClicked()
              close()
            }}
            ><i className='fas fa-download' style={{ color: 'rgb(37,37,37)', fontSize: '18px', marginTop: '3px', marginLeft: '-10px', marginRight: '5px' }}></i>Download</button>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Navbar