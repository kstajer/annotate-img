import React from 'react'
import { useState } from 'react';

function Workspace() {
  const [image, setImage] = useState({ preview: '', data: '' })
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:4000/image', {
      method: 'POST',
      body: formData,
    })
    if (response) console.log(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <div className='workspace'>
      <button className='previous-btn'>[</button>
      {image.preview && <img src={image.preview} width='100' height='100' alt='no file'/>}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>

      <button className='next-btn'>]</button>
    </div>
  )
}

export default Workspace
