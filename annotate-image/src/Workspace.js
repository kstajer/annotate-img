import React from 'react'
import { useState, useEffect } from 'react';

function Workspace({imgNames}) {

  const [currentImgID, setCurrentImgID]=useState(-1)
  const [currentImgName, setCurrentImgName]=useState(null)

  useEffect(() => {
    console.log(imgNames)
    nextImg()
  }, [imgNames]);

  useEffect(() => {
    console.log('id: ' + currentImgID + ' name: ' +currentImgName)
  }, [currentImgID]);

  // const changeCurrentImg = () =>{
  //   for(var x = 0; x<imgNames.length; x++) {
  //     if(currentImgID===imgNames[x].id){
  //       setCurrentImgName(imgNames[x].name)
  //     }
  // }
  // }

  const nextImg = () => {
    if(currentImgID < imgNames.length-1){
    setCurrentImgID(currentImgID + 1)
    setCurrentImgName(imgNames[currentImgID+1].name)
  }
}

  const previousImg = () => {
    if(currentImgID > 0){
    setCurrentImgID(currentImgID - 1)
    setCurrentImgName(imgNames[currentImgID-1].name)
    }
  }

  return (
    <div className='workspace'>
      <button className='previous-btn' onClick={previousImg}>[</button>
      <div className='img-display-div'>
        {/* {imgNames.map((image) => {
           return <img src={require(`${'./images/' + image.name}`)}></img>
          })
         } */}

        { currentImgName &&
        <img src={require(`${'./images/' + currentImgName}`)} className='img-display'></img>
        }
      </div>
      <button className='next-btn' onClick={nextImg}>]</button>
    </div>
  )
}

export default Workspace
