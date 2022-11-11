import { React, useEffect, useState } from 'react';

function Labels({ annotationLabels, currentImgID, pushIdToDelete, pushIdToHighlight, pushRename}) {
  const [rename, setRename] = useState({id: -1, name: ''});
  
  // useEffect(() => {
  //   console.log(rename)
  // }, [rename]);

  return (
    <div className='labels'>
      <p>Labels</p>
      {annotationLabels.length > 0 &&
        annotationLabels.map((record) => {
          if (record.annotations.length > 0) {
            return (
              record.annotations.map((annotation) => {
                if (record.id === currentImgID) {
                  return (
                    
                    <p onClick={() => { pushIdToHighlight(annotation.data.id, Math.random()) }}
                      className='display-label'>{annotation.data.id !== rename.id && 
                      <>
                        {annotation.data.counter}
                        {annotation.data.text}
                      </>
                      }
                      {annotation.data.id !== rename.id &&
                      <button onClick={() => {
                        setRename({id: annotation.data.id, name: annotation.data.text})
                      }}>E</button>
                      }
                      {
                        annotation.data.id === rename.id &&
                        <>
                          <input 
                            onChange={(e) => {setRename({id: annotation.data.id, name: e.target.value})}} 
                            defaultValue={annotation.data.text} 
                            style={{width: '100px'}}></input>
                          <button onClick={() => {
                            pushRename(rename)
                            setRename({id: -1, name: ''})
                            }}>S</button>
                        </>
                      }
                      { annotation.data.id !== rename.id &&
                        <button onClick={() => {
                        pushIdToDelete(annotation.data.id)
                        }}>X</button>
                      }
                      
                    </p>)
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