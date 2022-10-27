import React from 'react'
import { useState, useEffect, useRef} from 'react';
import Simple from "./demo";
import test_img from './images/dog.jpeg';

function Workspace({imgNames}) {

  const [currentImgID, setCurrentImgID]= useState(-1)
  const [currentImgName, setCurrentImgName]= useState(null)

  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const imgRef = useRef(null);

  const [workspaceHeight, setWorkspaceHeight] = useState(0);
  const [workspaceWidth, setWorkspaceWidth] = useState(0);
  const workspaceRef = useRef(null);

  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0)

  useEffect(() => {
    setWorkspaceHeight(workspaceRef.current.clientHeight)
    setWorkspaceWidth(workspaceRef.current.clientWidth)
  })

  var imgSlide=0;

  useEffect(() => {
    function handleResize() {
      setWorkspaceHeight(workspaceRef.current.clientHeight);
      setWorkspaceWidth(workspaceRef.current.clientWidth);

      if ((workspaceHeight / workspaceWidth) < (imgHeight / imgWidth)) {
        setOffsetHeight('100%');
        var scale = workspaceHeight / imgHeight;
        setOffsetWidth((imgWidth * scale) + 'px');
      }
      else if ((workspaceHeight / workspaceWidth) > (imgHeight / imgWidth)) {
        setOffsetWidth('100%');
        var scale = workspaceWidth / imgWidth;
        setOffsetWidth((imgHeight * scale) + 'px');
      }
      else if ((workspaceHeight / workspaceWidth) == (imgHeight / imgWidth)) {
        setOffsetWidth('100%');
        setOffsetHeight('100%');
      }

      console.log('img_ratio (H/W) = ' + Math.round((imgHeight / imgWidth) * 100) / 100);
      console.log('workspace_ratio (H/W) = ' + Math.round((workspaceHeight / workspaceWidth) * 100) / 100);
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
    console.log('id: ' + currentImgID + ' name: ' + currentImgName)
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
    const { naturalWidth, naturalHeight } = img;
    setImgWidth(naturalWidth);
    setImgHeight(naturalHeight);
  };

  return (
    <div className='workspace' onresize= {()=> {console.log('resied')}}>
      <button className='previous-btn' onClick={previousImg}>[</button>
      <div className='image-wrapper' ref={workspaceRef}>
        <div className='image-container' style={{ height: offsetHeight, width: offsetWidth }}>
          { currentImgName &&
          <>
            <Simple img={require(`${'./images/' + currentImgName}`)}/>
            <img onLoad={onImgLoad} src={require(`${'./images/' + currentImgName}`)} className='hide' ref={imgRef}></img>
          </>
          }
        </div>
      </div>
      <button className='next-btn' onClick={nextImg}>]</button>
    </div>
  )
}

export default Workspace