import React from 'react'

function Footer({imgDimensions, imgNames, currentImgID}) {
  return (
    <div className='footer'>
      <div className='footer-btns'>
        <button></button>
        <button></button>
        <span>
          <p>{currentImgID + 1}/{imgNames.length}</p>
          {
            imgDimensions.width && <p>{imgDimensions.width}x{imgDimensions.height}</p>
          }
        </span>
        <button></button>
      </div>
    </div>
  )
}
export default Footer