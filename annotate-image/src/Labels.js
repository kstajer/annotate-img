import { React, useEffect, useState } from 'react';

function Labels({ annotationLabels, currentImgID, pushIdToDelete, pushIdToHighlight, pushRename}) {
  const [rename, setRename] = useState({id: -1, name: ''});
  
  // useEffect(() => {
  //   console.log(rename)
  // }, [rename]);

  return (
    <div className='labels'>
      <p className='title'>Labels</p>
      {/* <hr className='title-hr'></hr> */}
      {annotationLabels.length > 0 &&
        annotationLabels.map((record) => {
          if (record.annotations.length > 0) {
            return (
              record.annotations.map((annotation) => {
                if (record.id === currentImgID) {
                  return (
                    
                    <div onClick={() => { pushIdToHighlight(annotation.data.id, Math.random()) }}
                      className='display-label'>{annotation.data.id !== rename.id && 
                      <>
                        <span className='text'>{annotation.data.text}</span>
                        <span className='id'>({annotation.data.counter})</span>
                      </>
                      }
                      <div className='labels-side-buttons'>
                      {annotation.data.id !== rename.id &&
                      <button className='rename-btn labels-btn' onClick={() => {
                        setRename({id: annotation.data.id, name: annotation.data.text})
                      }}></button>
                      }
                      {
                        annotation.data.id === rename.id &&
                        <>
                          <input 
                            className='rename-input'
                            onChange={(e) => {setRename({id: annotation.data.id, name: e.target.value})}} 
                            defaultValue={annotation.data.text} 
                          ></input>
                          <button className='save-rename-btn labels-btn' onClick={() => {
                            pushRename(rename)
                            setRename({id: -1, name: ''})
                            }}></button>
                        </>
                      }
                      { annotation.data.id !== rename.id &&
                        <button className='delete-btn labels-btn' onClick={() => {
                        pushIdToDelete(annotation.data.id)
                        }}></button>
                      }
                      </div>
                      
                    </div>)
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