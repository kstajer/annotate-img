import {React, useState, useEffect} from 'react'
import Annotation from "react-image-annotation";

function AnnotateImage({img, currentImgID, imgNames}){

    const [annotation, setAnnotation] = useState({})
    const [annotations, setAnnotations] = useState([])
    const [allAnnotations, setAllAnnotations] = useState(imgNames)

    useEffect(() => {
        for (let i = allAnnotations.length; i < imgNames.length; i++) {
            setAllAnnotations(allAnnotations=>([...allAnnotations, imgNames[i]]))
          }
      }, [imgNames]);
  
    useEffect(() => {
        console.log(allAnnotations)
        setAnnotations(allAnnotations[currentImgID].annotations)
      }, [currentImgID]);

    const onChange = (annotation) => {
        setAnnotation(annotation);
    };

    useEffect(() => {
        allAnnotations.map((image) => {
            if(image.id === currentImgID){
            image.annotations = annotations
            }
        })
        console.log(allAnnotations)

      }, [annotations]);


    const onSubmit = (annotation) => {
        const { geometry, data } = annotation;
        setAnnotation({})
        setAnnotations(annotations.concat({
            geometry,
            data: {
                ...data,
                id: Math.random()
            }
        }))
    };

        return (
            <Annotation
                src={img}
                alt="Two pebbles anthropomorphized holding hands"
                annotations={annotations}
                // type={RECT}
                value={annotation}
                onChange={onChange}
                onSubmit={onSubmit}
                className="image"
                allowTouch
            />
        );
    }

export default AnnotateImage;