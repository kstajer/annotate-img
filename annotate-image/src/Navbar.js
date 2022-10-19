import React, {useState, useEffect} from 'react'

function Navbar() {

  const [selectedFiles, setSelectedFiles]= useState(null)
  const [imageFiles, setImageFiles]=useState([])
  const [loaded, setLoaded]= useState(0)
  var id=0;

  useEffect(() => {
    handleSubmit(selectedFiles); 
    console.log(selectedFiles)
  }, [selectedFiles]);

  useEffect(() => {
    console.log(imageFiles)
  }, [imageFiles]);

  const handleSubmit = async (event) => {
    const data = new FormData()
    for(var x = 0; x<selectedFiles.length; x++) {
        data.append('file', selectedFiles[x])
    }

    const response = await fetch('http://localhost:4000/image', {
      method: 'POST',
      body: data,
      
    })
    if (response) console.log(response.statusText)
  }

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files)
    setImageFiles([...imageFiles, {id: id, img: event.target.files[0].name}])
    id= id+1
  }

  return (
    <div className='navbar'>
        <form onSubmit={handleSubmit}>
          <label for="upload-btn" class="custom-file-upload" id='upload-btn-label'>
          </label>
          <label for="upload-btn-label" class="upload-label">
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