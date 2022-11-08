import React from 'react'
import { useState, useEffect, useRef } from 'react';
import AnnotateImage from "./AnnotateImage.js";
import Labels from "./Labels.js";

function Workspace({ imgNames }) {

  const [currentImgID, setCurrentImgID] = useState(-1);
  const [currentImgName, setCurrentImgName] = useState(null);
  var imgSlide = 0;
  
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0)
  const workspaceRef = useRef(null);

  const [annotationLabels, setAnnotationLabels]= useState([])

  const pullAllAnnotations = (data) => {
    setAnnotationLabels(data)
    console.log(annotationLabels)
  }
  
  // scale & resize image

  function resizeContainer() {
    var workspaceHeight = workspaceRef.current.clientHeight;
    var workspaceWidth = workspaceRef.current.clientWidth;

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

  useEffect(() => {
    window.addEventListener('resize', resizeContainer)

    return _ => {
      window.removeEventListener('resize', resizeContainer)
    }
  });

  useEffect(() => {
    resizeContainer()
  }, [imgHeight, imgWidth]);

  const onImgLoad = ({ target: img }) => {
    const { naturalWidth, naturalHeight } = img;
    setImgWidth(naturalWidth);
    setImgHeight(naturalHeight);
  };

  // change image

  useEffect(() => {
    if (imgSlide === 1) {
      nextImg()
    }
    imgSlide += 1
  }, [imgNames]);

  const nextImg = () => {
    if (currentImgID < imgNames.length - 1) {
      setCurrentImgID(currentImgID + 1)
      setCurrentImgName(imgNames[currentImgID + 1].name)
      // resizeContainer();
    }
  }

  const previousImg = () => {
    if (currentImgID > 0) {
      setCurrentImgID(currentImgID - 1)
      setCurrentImgName(imgNames[currentImgID - 1].name)
      // resizeContainer();
    }
  }

  return (
    <div className='workspace-container'>
    <Labels annotationLabels={annotationLabels} currentImgID={currentImgID}/>
    <div className='workspace' >
      <button className='previous-btn' onClick={previousImg}>[</button>
      <div className='image-wrapper' ref={workspaceRef}>
        <div className='image-container' style={{ height: offsetHeight ? offsetHeight : '', width: offsetWidth ? offsetWidth : '' }}>
          {currentImgName &&
            <>
              <AnnotateImage img={require(`${'./images/' + currentImgName}`)} currentImgID={currentImgID} imgNames={imgNames} pullAllAnnotations={pullAllAnnotations} />
              <img onLoad={onImgLoad} src={require(`${'./images/' + currentImgName}`)} style={{display: 'none'}}></img>
            </>
          }
        </div>
      </div>
      <button className='next-btn' onClick={nextImg}>]</button>
    </div>
    </div>
  )
}

export default Workspace