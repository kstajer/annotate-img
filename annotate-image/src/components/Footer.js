import { React, useEffect, useState } from 'react'
import Popup from 'reactjs-popup';

function Footer({ imgDimensions, imgNames, currentImgID }) {

  const [displayFileName, setDisplayFileName] = useState('')

  useEffect(() => {
    if (imgNames.length > 0) {
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
            imgNames.length > 0 && <p>{currentImgID + 1}/{imgNames.length}</p>
          }
        </span>


        <Popup className='download-pop' trigger={<button><i className='fas fa-info-circle' style={{ color: 'lightgrey', fontSize: '22px', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}></i></button>} modal>
          {close => (
            <div className='popup-download'>
              <h3>How to use this app?</h3>
              <hr />
              <div>1. Use the <b>Upload</b> button to upload pictures you want to annotate.</div>
              <div>2. Select shape from the toolbar and set name for your annotations set.</div>
              <div>3. Click and drag on pictures to draw annotations.</div>
              <div>4. Change pictures with arrow buttons.</div>
              <div>5. You can edit or delete annotations in the <i>Labels</i> section.</div>
              <div>6. Use the <b>Download</b> button to download COCO file.</div>
              <br />
              <div>Note: To upload annotations from COCO file, use the <b>Upload COCO</b> button after uploading your pictures set first.</div>

            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}
export default Footer