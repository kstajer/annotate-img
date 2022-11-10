import {React, useState, useEffect} from 'react'
import Annotation from "react-image-annotation";
import Content from './render/Content';

import Rectangle from './selectors/Rectangle.js';
import Oval from './selectors/Oval.js';
import Point from './selectors/Point.js';

import {
    PointSelector,
    RectangleSelector,
    OvalSelector
  } from 'react-image-annotation/lib/selectors'


function AnnotateImage( props ){
    // props: img, currentImgID, imgNames, pullAllAnnotations, 
    // idToDelete, idToHighlight, labelClicked, clearAll, selectorType
    
    const [annotation, setAnnotation] = useState({});
    const [annotations, setAnnotations] = useState([]);
    const [allAnnotations, setAllAnnotations] = useState(props.imgNames);
    const [annotationId, setAnnotationId] = useState(0);
    const [annotationToHighlight, setAnnotationToHighlight] = useState();

    var allSelectors = {'RECTANGLE': Rectangle, "OVAL": Oval, "POINT": Point}

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

      useEffect(() => {
        // if (props.selectorType == 'RECTANGLE') {
        //     setSelector(allSelectors.RECTANGLE)
        // }
        // else if (props.selectorType == 'OVAL') {
        //     setSelector(allSelectors.OVAL)
        // }
        // else if (props.selectorType == 'POINT') {
        //     setSelector(allSelectors.POINT)
        // }
        // console.log(selector)
      }, [props.selectorType]);

    useEffect(() => {
        var tempAnn = structuredClone(allAnnotations)
        tempAnn[props.currentImgID].annotations = []
        setAllAnnotations(tempAnn)
        setAnnotations([])
    }, [props.clearAll]);

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
                    type: props.selectorType
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
                type={props.selectorType == 'RECTANGLE' ? RectangleSelector.TYPE : (props.selectorType == 'OVAL' ? OvalSelector.TYPE : PointSelector.TYPE)}
                value={annotation}
                onChange={onChange}
                onSubmit={onSubmit}
                className="image"
                renderSelector={props.selectorType == 'RECTANGLE' ? allSelectors.RECTANGLE : (props.selectorType == 'OVAL' ? allSelectors.OVAL : allSelectors.POINT)}
                renderHighlight= {({ key, annotation, active }) => {
                    switch (annotation.geometry.type) {
                        case RectangleSelector.TYPE:
                          return (
                            <Rectangle
                              key={key}
                              annotation={annotation}
                              active={active}
                            />
                          )
                        case PointSelector.TYPE:
                          return (
                            <Point
                              key={key}
                              annotation={annotation}
                              active={active}
                            />
                          )
                        case OvalSelector.TYPE:
                          return (
                            <Oval
                              key={key}
                              annotation={annotation}
                              active={active}
                            />
                          )
                        default:
                          return null
                }
                 }}
                renderContent={Content}
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