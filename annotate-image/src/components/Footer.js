import {React, useEffect, useState} from 'react'

function Footer({imgDimensions, imgNames, currentImgID}) {

  const [displayFileName, setDisplayFileName]= useState('')

  useEffect(() => {
    // console.log('imgNames from footer -----------')
    // console.log(imgNames)
    if(imgNames.length > 0){
      setDisplayFileName(imgNames[currentImgID].name)
    }
  }, [currentImgID]);

  return (
    <div className='footer'>
      <div className='footer-btns'>
        <span>
          {
            imgNames.length > 0 && <p className='img-name'>{displayFileName}</p>
          }
          {
            imgDimensions.width && <p>{imgDimensions.width} x {imgDimensions.height}</p>
          }
                    {
           imgNames.length >0 && <p>{currentImgID + 1}/{imgNames.length}</p>
          }
        </span>
        <button><i className='fas fa-info-circle' style={{color: 'lightgrey', fontSize: '22px', marginTop: '0px', marginLeft: '0px', marginRight: '0px'}}></i></button>
      </div>
    </div>
  )
}
export default Footer