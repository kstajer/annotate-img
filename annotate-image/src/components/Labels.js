import { React, useState } from 'react';

function Labels({ allAnnotations, currentImgID, pushIdToDelete, pushIdToHighlight, pushRename, pushDisplayLabels}) {

  const [rename, setRename] = useState({id: -1, name: ''});

  return (
    <div className='labels'>
      <div className= 'title-btn'>
        <p className='title'>Labels</p>
      </div>
      {allAnnotations.length > 0 &&
        allAnnotations.map((record) => {
          if (record.annotations.length > 0) {
            return (
              record.annotations.map((annotation) => {
                if (record.id === currentImgID) {
                  return (
                    <div onClick={() => { pushIdToHighlight(annotation.data.id, Math.random()) }}
                      className='display-label'>{annotation.data.id !== rename.id && 
                      <div className='label-desc'>
                        <span className={annotation.data.text === '' ? 'empty-text' : 'text'}>{annotation.data.text === '' ? '[annotation]' : annotation.data.text}</span>
                        <div className='id-type-div'>
                          <span className='id'>id: {annotation.data.id + 1}, type </span>
                          <span className='type'>: {annotation.geometry.type}</span>
                        </div>
                      </div>
                      }
                      <div className='labels-side-buttons'>
                      {annotation.data.id !== rename.id &&
                      <button className='rename-btn labels-btn' onClick={() => {
                        setRename({id: annotation.data.id, name: annotation.data.text})
                      }}><i className='fas fa-edit fa-fw' style={{color: 'lightgrey', fontSize: '18px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}}></i></button>
                      }
                      {
                        annotation.data.id === rename.id &&
                        <>
                          <input 
                            className='rename-input'
                            maxLength= '12'
                            onChange={(e) => {setRename({id: annotation.data.id, name: e.target.value})}} 
                            defaultValue={annotation.data.text} 
                          ></input>
                          <button className='save-rename-btn labels-btn' onClick={() => {
                            pushRename(rename)
                            setRename({id: -1, name: ''})
                            }}><i className='fas fa-check' style={{color: 'lightgrey', fontSize: '20px', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}}></i></button>
                          <button className='close-rename-btn labels-btn' onClick={() => {
                            setRename({id: -1, name: ''})
                            }}><i className='fas fa-undo' style={{color: 'lightgrey', fontSize: '18px', marginTop: '6px', marginLeft: 'auto', marginRight: 'auto'}}></i></button>
                        </>
                      }
                      { annotation.data.id !== rename.id &&
                        <button className='delete-btn labels-btn' onClick={() => {
                        pushIdToDelete(annotation.data.id)
                        }}><i className='fas fa-trash-alt fa-fw' style={{color: 'lightgrey', fontSize: '18px', marginTop: '6px'}}></i></button>
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
    </div>
  )
}

export default Labels