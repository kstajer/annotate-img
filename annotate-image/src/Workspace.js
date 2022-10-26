import React from 'react'
import { useState, useEffect } from 'react';

function Workspace({imgNames}) {

  const [currentImgID, setCurrentImgID]= useState(-1)
  const [currentImgName, setCurrentImgName]= useState(null)
  const [imageDimensions, setImageDimensions] = useState({});
  var imgSlide=0;

  useEffect(() => {
    console.log(imgNames)
    if(imgSlide===1){
      nextImg()
      imgSlide+=1
    }
  }, [imgNames]);

  useEffect(() => {
    console.log('id: ' + currentImgID + ' name: ' +currentImgName)
  }, [currentImgID]);

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

  const onImgLoad = ({ target: img }) => {
    const { width, height } = img;
    console.log(width, height)
  };

  return (
    <div className='workspace'>
      <button className='previous-btn' onClick={previousImg}>[</button>
      <div className='img-display-div'>
        { currentImgName &&
        <img onLoad={onImgLoad} src={require(`${'./images/' + currentImgName}`)} className='img-display'></img>
        }
      </div>
      <button className='next-btn' onClick={nextImg}>]</button>
    </div>
  )
}

export default Workspace