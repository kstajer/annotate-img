import { React, useEffect, useState } from 'react';

function Labels({ annotationLabels, currentImgID }) {

  return (
    <div className='labels'>
      <p>Labels</p>
      {annotationLabels.length > 0 &&
        annotationLabels.map((record) => {
          if (record.annotations.length > 0) {
            return (
              record.annotations.map((annotation) => {
                if (record.id === currentImgID) {
                  return (<p>{annotation.data.text}</p>)
                }
                else {
                  return null
                }
              })
            )
          }
          else {
            return null
          }
        })
      }

      {/* <div className='display-labels'>
        <label for="touch"><span>person</span></label>
        <input type="checkbox" id="touch" />
        <ul class="slide">
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
        </ul>

        <label for="touch2"><span>dog</span></label>
        <input type="checkbox" id="touch2" />
        <ul class="slide">
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
        </ul>

        <label for="touch3"><span>tree</span></label>
        <input type="checkbox" id="touch3" />
        <ul class="slide">
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
        </ul>
    </div> */}

    </div>
  )
}

export default Labels