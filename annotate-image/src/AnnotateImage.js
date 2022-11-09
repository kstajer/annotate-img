import {React, useState, useEffect} from 'react'
import Annotation from "react-image-annotation";

import Rectangle from './selectors/Rectangle';

function AnnotateImage({img, currentImgID, imgNames, pullAllAnnotations, idToDelete, idToHighlight, labelClicked}){

    const [annotation, setAnnotation] = useState({});
    const [annotations, setAnnotations] = useState([]);
    const [allAnnotations, setAllAnnotations] = useState(imgNames);
    const [annotationId, setAnnotationId] = useState(0);
    const [annotationToHighlight, setAnnotationToHighlight] = useState();

    useEffect(() => {
        setAnnotations(annotations.filter((annotation) => annotation.data.id !== idToDelete))
      }, [idToDelete]);

    useEffect(() => {
        findAnnotationById(annotations, idToHighlight)
    }, [labelClicked]);

    function findAnnotationById(annotations, idToHighlight) {
        const ann = annotations.find(obj => obj.data.id === idToHighlight)
        setAnnotationToHighlight(ann)
    }


    useEffect(() => {
        for (let i = allAnnotations.length; i < imgNames.length; i++) {
            setAllAnnotations(allAnnotations=>([...allAnnotations, imgNames[i]]))
          }
      }, [imgNames]);

    useEffect(() => {
        setAnnotations(allAnnotations[currentImgID].annotations)
      }, [currentImgID]);

    const onChange = (annotation) => {
        setAnnotation(annotation);
        setAnnotationToHighlight();
    };

    useEffect(() => {
        allAnnotations.map((image) => {
            if(image.id === currentImgID){
            image.annotations = annotations
            }
        })

        var tempAnn = structuredClone(allAnnotations)
        tempAnn[currentImgID].annotations = annotations

        setAllAnnotations(tempAnn)
        pullAllAnnotations(allAnnotations)
      }, [annotations]);


    const onSubmit = (annotation) => {
        const { geometry, data } = annotation;
        setAnnotation({})
        setAnnotations(annotations.concat({
            geometry,
            data: {
                ...data,
                id: annotationId
            }
        }))
        setAnnotationId(annotationId + 1);
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
                renderSelector={Rectangle}
                renderHighlight={Rectangle}
                activeAnnotations={[annotationToHighlight]}
                allowTouch
            />
        );
    }

export default AnnotateImage;