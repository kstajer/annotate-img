import {React, useState, useEffect} from 'react'
import Annotation from "react-image-annotation";
import Root from "react-image-annotation";

function AnnotateImage({img, currentImgID, imgNames}){

    const [annotation, setAnnotation] = useState({})
    const [annotations, setAnnotations] = useState([])
    const [allAnnotations, setAllAnnotations] = useState(imgNames)
    const [imageId, setImageId] = useState(currentImgID)
  
    useEffect(() => {
        setAnnotations(allAnnotations[currentImgID].annotations)
        console.log('przed: '+imageId)
        setImageId(currentImgID)
        console.log('po: '+imageId)
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
            // <Root>
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
            // </Root>
        );
    }

export default AnnotateImage;