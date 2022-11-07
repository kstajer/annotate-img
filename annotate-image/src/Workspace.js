import React from 'react'
import { useState, useEffect, useRef } from 'react';
import AnnotateImage from "./AnnotateImage.js";

function Workspace({ imgNames }) {

  const [currentImgID, setCurrentImgID] = useState(-1)
  const [currentImgName, setCurrentImgName] = useState(null)

  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  const [workspaceHeight, setWorkspaceHeight] = useState(0);
  const [workspaceWidth, setWorkspaceWidth] = useState(0);
  const workspaceRef = useRef(null);

  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0)


  function resizeContainer() {
    setWorkspaceHeight(workspaceRef.current.clientHeight);
    setWorkspaceWidth(workspaceRef.current.clientWidth);

    if ((workspaceHeight / workspaceWidth) < (imgHeight / imgWidth)) {
      setOffsetHeight(workspaceHeight + 'px');
      var scale = workspaceHeight / imgHeight
      setOffsetWidth((imgWidth * scale) + 'px');
    }
    else if ((workspaceHeight / workspaceWidth) > (imgHeight / imgWidth)) {
      setOffsetWidth(workspaceWidth + 'px');
      var scale = workspaceWidth / imgWidth
      setOffsetHeight((imgHeight * scale) + 'px');
    }
    else if ((workspaceHeight / workspaceWidth) == (imgHeight / imgWidth)) {
      setOffsetWidth('100%');
      setOffsetHeight('100%');
    }
  }

  var imgSlide = 0;

  useEffect(() => {
    function handleResize() {
      resizeContainer();
    }
    window.addEventListener('resize', handleResize)
  })

  useEffect(() => {
    if (imgSlide === 1) {
      nextImg()
    }
    imgSlide += 1
  }, [imgNames]);

  useEffect(() => {
    // console.log('id: ' + currentImgID + ' name: ' + currentImgName)
  }, [currentImgID]);

  useEffect(() => {
    resizeContainer()
  }, [imgHeight, imgWidth]);

  const nextImg = () => {
    if (currentImgID < imgNames.length - 1) {
      setCurrentImgID(currentImgID + 1)
      setCurrentImgName(imgNames[currentImgID + 1].name)
      resizeContainer();
    }
  }

  const previousImg = () => {
    if (currentImgID > 0) {
      setCurrentImgID(currentImgID - 1)
      setCurrentImgName(imgNames[currentImgID - 1].name)
      resizeContainer();
    }
  }

  const onImgLoad = ({ target: img }) => {
    const { naturalWidth, naturalHeight } = img;
    setImgWidth(naturalWidth);
    setImgHeight(naturalHeight);
  };


  return (
    <div className='workspace' onResize={() => { }}>
      <button className='previous-btn' onClick={previousImg}>[</button>
      <div className='image-wrapper' ref={workspaceRef}>
        <div className='image-container' style={{ height: offsetHeight ? offsetHeight : '', width: offsetWidth ? offsetWidth : '' }}>
          {currentImgName &&
            <>
              <AnnotateImage img={require(`${'./images/' + currentImgName}`)} currentImgID={currentImgID} imgNames={imgNames} />
              <img onLoad={onImgLoad} src={require(`${'./images/' + currentImgName}`)} style={{display: 'none'}}></img>
            </>
          }
        </div>
      </div>
      <button className='next-btn' onClick={nextImg}>]</button>
    </div>
  )
}

export default Workspace