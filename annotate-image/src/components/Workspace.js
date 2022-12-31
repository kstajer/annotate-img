import React from 'react'
import { useState, useEffect, useRef } from 'react';
import AnnotateImage from "./AnnotateImage.js";
import Labels from "./Labels.js";
import { download } from '../download.js';

function Workspace({ imgNames, annName, getImgDimensions, getCurrentImgID, clearAll, selectorType, downloadForm, displayLabels, inputCoco }) {

  const [currentImgID, setCurrentImgID] = useState(-1);
  const [currentImgName, setCurrentImgName] = useState(null);
  const [imgDimensions, setImgDimensions] = useState({});
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0)
  const workspaceRef = useRef(null);
  const [allAnnotations, setAllAnnotations] = useState([]);
  const [idToDelete, setIdToDelete] = useState();
  const [idToHighlight, setIdToHighlight] = useState();
  const [rename, setRename] = useState({ id: -1, name: '' })
  const [clicked, setClicked] = useState();
  const [annotationsCategories, setAnnotationsCategories] = useState([]);
  const [disLabels, setDisLabels] = useState(false)

  const pullIdToDelete = (id) => {
    setIdToDelete(id);
  }

  const pullIdToHighlight = (id, clicked) => {
    setIdToHighlight(id);
    setClicked(clicked);
  }

  const pullAllAnnotations = (data) => {
    setAllAnnotations(data)
  }

  const pullRename = (data) => {
    setRename(data)
  }

  const pullDisplayLabels = (data) => {
    setDisLabels(data)
  }

  useEffect(() => {
    setDisLabels(!disLabels)
  }, [displayLabels]);

  useEffect(() => {
    resizeContainer()
  }, [disLabels]);

  useEffect(() => {
    window.addEventListener('resize', resizeContainer)
    return _ => {
      window.removeEventListener('resize', resizeContainer)
    }
  });

  useEffect(() => {
    download(allAnnotations, annotationsCategories, downloadForm)
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
    setImgDimensions({ height: naturalHeight, width: naturalWidth })
  };

  useEffect(() => {
    if (currentImgID === -1) {
      const timer = setTimeout(() => {
        nextImg()
      }, 1000)
    }
  }, [imgNames]);

  function resizeContainer() {
    var workspaceHeight = workspaceRef.current.clientHeight;
    var workspaceWidth = workspaceRef.current.clientWidth;

    if ((workspaceHeight / workspaceWidth) < (imgDimensions.height / imgDimensions.width)) {
      setOffsetHeight(workspaceHeight + 'px');
      setOffsetWidth((imgDimensions.width * (workspaceHeight / imgDimensions.height)) + 'px');
    }
    else if ((workspaceHeight / workspaceWidth) > (imgDimensions.height / imgDimensions.width)) {
      setOffsetWidth(workspaceWidth + 'px');
      setOffsetHeight((imgDimensions.height * (workspaceWidth / imgDimensions.width)) + 'px');
    }
    else if ((workspaceHeight / workspaceWidth) == (imgDimensions.height / imgDimensions.width)) {
      setOffsetWidth('100%');
      setOffsetHeight('100%');
    }
  }

  const nextImg = () => {
    if (allAnnotations !== imgNames && allAnnotations.length > 0) {
      imgNames = allAnnotations
    }
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
      {disLabels &&
        <Labels
          allAnnotations={allAnnotations}
          currentImgID={currentImgID}
          pushIdToDelete={pullIdToDelete}
          pushIdToHighlight={pullIdToHighlight}
          pushRename={pullRename}
          pushDisplayLabels={pullDisplayLabels}
        />
      }
      <div className='workspace' style={{ width: disLabels ? 'calc(80% - 18px)' : '100%' }}>
        <button className='previous-btn' onClick={previousImg}><i className='fas fa-chevron-left' style={{ color: 'darkgrey', fontSize: '24px', marginTop: '3px', marginLeft: 'auto', marginRight: 'auto' }}></i></button>
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
                  inputCoco={inputCoco}
                />
                <img
                  onLoad={onImgLoad}
                  src={require(`${'./images/' + currentImgName}`)}
                  style={{ display: 'none' }}></img>
              </>
            }
          </div>
        </div>
        <button className='next-btn' onClick={nextImg}><i className='fas fa-chevron-right' style={{ color: 'darkgrey', fontSize: '24px', marginTop: '3px', marginLeft: 'auto', marginRight: 'auto' }}></i></button>
      </div>
    </div>
  )
}

export default Workspace