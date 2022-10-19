import React, {useState, useEffect} from 'react'

function Navbar() {

  const [selectedFiles, setSelectedFiles]= useState(null)
  const [imageFiles, setImageFiles]=useState([])
  const [currentImgID, setCurrentImgID]=useState(2)
  const [currentImgName, setCurrentImgName]=useState('IMG_2640.JPG')
  const [imgNamesList, setImgNamesList]=useState([])
  var id=0;
  var imgNames=[]
  var imgNamesTest = [{id:0, name:'IMG_2640.JPG'}, {id:1, name:'dddd.jpg'}, {id:2, name:'aaa.png'}]

  useEffect(() => {
    if(selectedFiles){
    handleSubmit(selectedFiles); 
    }
  }, [selectedFiles]);

  useEffect(() => {
    console.log(imgNamesList)
  }, [imgNamesList]);

  const changeCurrentImg = () =>{
    for(var x = 0; x<imgNames.length; x++) {
      if(currentImgID===imgNames[x].id){
        setCurrentImgName(imgNames[x].name)
      }
  }
  }

  const handleSubmit = async (event) => {
    const data = new FormData()
    for(var x = 0; x<selectedFiles.length; x++) {
        data.append('file', selectedFiles[x])
        imgNames.push({id:id, name:selectedFiles[x].name})
        id=id+1
        getImgName(selectedFiles[x])
    }

    const response = await fetch('http://localhost:4000/image', {
      method: 'POST',
      body: data,
      
    })
    if (response) console.log(response.statusText)
  }

  const getImgName = (imgData) => {
    setImgNamesList(imgNamesList=> [...imgNamesList, {id: id, name: imgData.name}])
    id= id+1
  }

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files)
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

        <button onClick= {changeCurrentImg}>elo</button>

          {/* <img src={require(currentImgName)}/> */}
          <img src={require('./images/' + imgNamesTest[0].name)}></img>
          

    </div>
  )
}

export default Navbar