import {React, useState, useEffect} from 'react'
import Annotation from "react-image-annotation";

import Rectangle from './selectors/Rectangle';

function AnnotateImage( props ){
    // props: img, currentImgID, imgNames, pullAllAnnotations, idToDelete, idToHighlight, labelClicked
    
    const [annotation, setAnnotation] = useState({});
    const [annotations, setAnnotations] = useState([]);
    const [allAnnotations, setAllAnnotations] = useState(props.imgNames);
    const [annotationId, setAnnotationId] = useState(0);
    const [annotationToHighlight, setAnnotationToHighlight] = useState();

    useEffect(() => {
        setAnnotations(annotations.filter((annotation) => annotation.data.id !== props.idToDelete))
      }, [props.idToDelete]); 

    useEffect(() => {
        findAnnotationById(annotations, props.idToHighlight)
    }, [props.labelClicked]);

    function findAnnotationById(annotations, id) {
        const ann = annotations.find(obj => obj.data.id === id)
        setAnnotationToHighlight(ann)
    }


    useEffect(() => {
        for (let i = allAnnotations.length; i < props.imgNames.length; i++) {
            setAllAnnotations(allAnnotations=>([...allAnnotations, props.imgNames[i]]))
          }
      }, [props.imgNames]);

    useEffect(() => {
        setAnnotations(allAnnotations[props.currentImgID].annotations)
      }, [props.currentImgID]);

    const onChange = (annotation) => {
        setAnnotation(annotation);
        setAnnotationToHighlight();
    };

    useEffect(() => {
        allAnnotations.map((image) => {
            if(image.id === props.currentImgID){
            image.annotations = annotations
            }
        })

        var tempAnn = structuredClone(allAnnotations)
        tempAnn[props.currentImgID].annotations = annotations

        setAllAnnotations(tempAnn)
        props.pullAllAnnotations(allAnnotations)
      }, [annotations]);


    const onSubmit = (annotation) => {
        const { geometry, data } = annotation;
        if(!(typeof geometry == 'undefined')){
            setAnnotation({})
            setAnnotations(annotations.concat({
                geometry: {
                    ...geometry,
                    type: "RECTANGLE"
                },
                data: {
                    text: props.annName,
                    id: annotationId
                }
            }))
            setAnnotationId(annotationId + 1);
        }
        else {
            console.log('zle oznaczenie')
        }
        
    };

        return (
            <Annotation
                src={props.img}
                alt="Two pebbles anthropomorphized holding hands"
                annotations={annotations}
                // type={RECT}
                value={annotation}
                onChange={onChange}
                onSubmit={onSubmit}
                className="image"
                renderSelector={Rectangle}
                renderHighlight={Rectangle}
                disableEditor={true}
                onMouseUp={(e) => {
                    onSubmit(annotation)
                }}
                activeAnnotations={[annotationToHighlight]}
                allowTouch
            />
        );
    }

export default AnnotateImage;