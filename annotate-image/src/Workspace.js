import React from 'react'
import { useState, useEffect } from 'react';

function Workspace({imgNames}) {

  const [currentImgID, setCurrentImgID]= useState(-1)
  const [currentImgName, setCurrentImgName]= useState(null)
  const [imageCurrentSize, setImageCurrentSize] = useState([]);
  const [imgNaturalSize, setImageNaturalSize] = useState([]);

  var imgSlide=0;

  useEffect(() => {
    function handleResize() {
      if (imageCurrentSize.length > 0) {
        console.log('resized2')
        console.log(imageCurrentSize)
      }
  }
    window.addEventListener('resize', handleResize)
  })

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
    const { clientWidth, clientHeight } = img;
    const { naturalWidth, naturalHeight } = img;
    setImageCurrentSize([clientWidth, clientHeight]);
    setImageNaturalSize([naturalWidth, clientHeight]);
    console.log('teraz: '+ clientWidth + ', ' + clientHeight + '; oryginal: ' + naturalWidth + ', ' + naturalHeight)
  };

  return (
    <div className='workspace' onresize= {()=> {console.log('resied')}}>
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