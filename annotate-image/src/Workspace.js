import React from 'react'
import { useState, useEffect, useRef } from 'react';
import AnnotateImage from "./AnnotateImage.js";
import Labels from "./Labels.js";
import { download } from './download.js';


function Workspace({ imgNames, annName, getImgDimensions, getCurrentImgID, clearAll, selectorType, downloadForm, displayLabels}) {

  const [currentImgID, setCurrentImgID] = useState(-1);
  const [currentImgName, setCurrentImgName] = useState(null);
  var imgSlide = 1;

  const [imgDimensions, setImgDimensions] = useState({});

  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0)
  const workspaceRef = useRef(null);

  const [annotationLabels, setAnnotationLabels] = useState([]);

  const [idToDelete, setIdToDelete] = useState();
  const [idToHighlight, setIdToHighlight] = useState();
  const [rename, setRename] = useState({id: -1, name: ''})
  const [clicked, setClicked] = useState();
  const [annotationsCategories, setAnnotationsCategories] = useState([]);

  const [disLabels, setDisLabels]= useState(false)

  const pullIdToDelete = (id) => {
    setIdToDelete(id);
  }

  const pullIdToHighlight = (id, clicked) => {
    setIdToHighlight(id);
    setClicked(clicked);
  }

  const pullAllAnnotations = (data) => {
    setAnnotationLabels(data)
    console.log(annotationLabels)
  }

  // const pullAnnotationsCounted = (data) => {
  //   setAnnotationsCounted(data)
  // }

  const pullRename = (data) => {
    setRename(data)
  }

  const pullDisplayLabels= (data) => {
    setDisLabels(data)
  }

  useEffect(() => {
    setDisLabels(!disLabels)
    resizeContainer()
  }, [displayLabels]);
  
  // scale & resize image

  function resizeContainer() {
    var workspaceHeight = workspaceRef.current.clientHeight;
    var workspaceWidth = workspaceRef.current.clientWidth;

    if ((workspaceHeight / workspaceWidth) < (imgDimensions.height / imgDimensions.width)) {
      setOffsetHeight(workspaceHeight + 'px');
      var scale = workspaceHeight / imgDimensions.height
      setOffsetWidth((imgDimensions.width * scale) + 'px');
    }
    else if ((workspaceHeight / workspaceWidth) > (imgDimensions.height / imgDimensions.width)) {
      setOffsetWidth(workspaceWidth + 'px');
      var scale = workspaceWidth / imgDimensions.width
      setOffsetHeight((imgDimensions.height * scale) + 'px');
    }
    else if ((workspaceHeight / workspaceWidth) == (imgDimensions.height / imgDimensions.width)) {
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
    console.log(download(annotationLabels, annotationsCategories, downloadForm))
  }, [downloadForm]);

  useEffect(() => {
    resizeContainer()
    getImgDimensions(imgDimensions)
  }, [imgDimensions]);

  useEffect(() => {
    setAnnotationsCategories([...annotationsCategories, annName])
  }, [annName]);


  useEffect(() => {
    setAnnotationsCategories([...annotationsCategories, rename.name])
  }, [rename]);

  useEffect(() => {
    getCurrentImgID(currentImgID)
  }, [currentImgID]);

  const onImgLoad = ({ target: img }) => {
    const { naturalWidth, naturalHeight } = img;
    setImgDimensions({height: naturalHeight, width: naturalWidth})
  };

  // change image
  useEffect(() => {
    if (imgSlide === 1) {
      nextImg()
      imgSlide += 1
    }
  }, [imgNames]);

  const nextImg = () => {
    if (currentImgID < imgNames.length - 1) {
      setCurrentImgID(currentImgID + 1)
      setCurrentImgName(imgNames[currentImgID + 1].name)
    }
  }

  const previousImg = () => {
    if (currentImgID > 0) {
      setCurrentImgID(currentImgID - 1)
      setCurrentImgName(imgNames[currentImgID - 1].name)
    }
  }

  return (
    <div className='workspace-container'>
      { disLabels &&
    <Labels 
      annotationLabels={annotationLabels} 
      currentImgID={currentImgID} 
      pushIdToDelete={pullIdToDelete} 
      pushIdToHighlight={pullIdToHighlight}
      pushRename={pullRename}
      pushDisplayLabels={pullDisplayLabels}
    />
      }
    <div className='workspace'  style={{width: disLabels ? '80%' : '100%'}}>
      <button className='previous-btn' onClick={previousImg}><i className='fas fa-chevron-left' style={{color: 'darkgrey', fontSize: '24px', marginTop: '3px', marginLeft: 'auto', marginRight: 'auto'}}></i></button>
      <div className='image-wrapper' ref={workspaceRef}>
        <div className='image-container' style={{ height: offsetHeight ? offsetHeight : '', width: offsetWidth ? offsetWidth : '' }}>
          {currentImgName &&
            <>
              <AnnotateImage 
                img={require(`${'./images/' + currentImgName}`)} 
                currentImgID={currentImgID} 
                imgNames={imgNames} 
                pullAllAnnotations={pullAllAnnotations}
                idToDelete={idToDelete}
                idToHighlight={idToHighlight}
                labelClicked={clicked}
                annName={annName}
                clearAll={clearAll}
                selectorType={selectorType}
                rename={rename}
                imgDimensions={imgDimensions}
              />
              <img 
                onLoad={onImgLoad} 
                src={require(`${'./images/' + currentImgName}`)} 
                style={{display: 'none'}}></img>
            </>
          }
        </div>
      </div>
      <button className='next-btn' onClick={nextImg}><i className='fas fa-chevron-right' style={{color: 'darkgrey', fontSize: '24px', marginTop: '3px', marginLeft: 'auto', marginRight: 'auto'}}></i></button>
    </div>
    </div>
  )
}

export default Workspace