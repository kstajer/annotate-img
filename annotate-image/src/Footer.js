import React from 'react'

function Footer({imgDimensions, imgNames, currentImgID}) {
  return (
    <div className='footer'>
      <div className='footer-btns'>
        <span>
          {
           imgNames.length >0 && <p>{currentImgID + 1}/{imgNames.length}</p>
          }
          {
            imgDimensions.width && <p>{imgDimensions.width} x {imgDimensions.height}</p>
          }
        </span>
        <button><i className='fas fa-info-circle' style={{color: 'lightgrey', fontSize: '22px', marginTop: '0px', marginLeft: '0px', marginRight: '0px'}}></i></button>
      </div>
    </div>
  )
}
export default Footer