import React from 'react'

function Labels() {
  return (
    <div className='labels'>
      <p>Labels</p>
      <div className='display-labels'>
        <label for="touch"><span>person</span></label>               
        <input type="checkbox" id="touch"/> 
        <ul class="slide">
          <li><a href="#">Lorem Ipsum</a></li> 
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
        </ul>

        <label for="touch2"><span>dog</span></label>               
        <input type="checkbox" id="touch2"/> 
        <ul class="slide">
          <li><a href="#">Lorem Ipsum</a></li> 
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
        </ul>

        <label for="touch3"><span>tree</span></label>               
        <input type="checkbox" id="touch3"/> 
        <ul class="slide">
          <li><a href="#">Lorem Ipsum</a></li> 
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
          <li><a href="#">Lorem Ipsum</a></li>
        </ul>
      </div>

    </div>
  )
}

export default Labels