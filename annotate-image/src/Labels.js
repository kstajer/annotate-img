import {React, useEffect, useState} from 'react';

function Labels( {annotationLabels, currentImgID} ) {

  // const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    console.log(annotationLabels)
  });


  return (
    <div className='labels'>
      <p>Labels</p>
{/* 
      {annotationLabels.length > 0 &&

      } */}

      {/* {annotations.length > 0 &&
        <div>
          {annotations.map((record)=>
            {
              if(record.id === currentImgID)
              {
                {record.annotations.length > 0 &&
                  record.annotations.map((annotation)=>
                  {
                    return <div>
                      <p>{annotation.data.text}</p>
                    </div>
                  })  }
              }
            }
          )}
        </div>
      } */}

      {/* <div>
      {annotationLabels.map((record) => {
        if(record.id === currentImgID && record.annotations.length > 0){
            {record.annotations.map((annotation)=> {
              return (<p>{annotation.data.text}</p>)
            })}
        }
      })
      }

    <div>
      {annotationLabels.map((record, index) => {
        if(record.id === currentImgID && record.annotations.length > 0)
        return (
          <div key={index}>
            {record.annotations.map((annotation, index) => {
              return (
                <div key={index}>
                  <h2>an: {annotation}</h2>
                </div>
              );
            })}

            <hr />
          </div>
        )
      </div> */}


      
    
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