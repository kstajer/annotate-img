import { React, useState, useEffect } from 'react'
import Annotation from "react-image-annotation";
import Content from './render/Content';

import Rectangle from './selectors/Rectangle.js';
import Oval from './selectors/Oval.js';
import Point from './selectors/Point.js';

import {
    RectangleSelector,
    OvalSelector,
    PointSelector
} from 'react-image-annotation/lib/selectors'


function AnnotateImage(props) {
    // props: img, currentImgID, imgNames, pullAllAnnotations, 
    // idToDelete, idToHighlight, labelClicked, clearAll, selectorType, rename

    const [annotation, setAnnotation] = useState({});
    const [annotations, setAnnotations] = useState([]);
    const [allAnnotations, setAllAnnotations] = useState(props.imgNames);
    const [annotationId, setAnnotationId] = useState(0);
    const [annotationToHighlight, setAnnotationToHighlight] = useState();

    const [annotationsCounted, setAnnotationsCounted] = useState({});

    var allSelectors = { 'RECTANGLE': Rectangle, "OVAL": Oval, "POINT": Point }

    useEffect(() => {
        setAnnotations(annotations.filter((annotation) => annotation.data.id !== props.idToDelete))
    }, [props.idToDelete]);

    useEffect(() => {
        findAnnotationToRename(annotations, props.rename.id, props.rename.name)
    }, [props.rename]);

    useEffect(() => {
        findAnnotationToHiglight(annotations, props.idToHighlight)
    }, [props.labelClicked]);


    function findAnnotationToHiglight(annotations, id) {
        const ann = annotations.find(obj => obj.data.id === id)
        setAnnotationToHighlight(ann)
    }

    function findAnnotationToRename(annotations, id, newName) {
        if (id > 0) {
            var ann = annotations.find(obj => obj.data.id === id)
            ann['data'].text = newName

            var tempAnn = []

            annotations.forEach(annotation => {
                if (annotation.data.id === id) {
                    annotation.data.name = newName
                }
                tempAnn.push(annotation)
            });

            setAnnotations(tempAnn)
            var tempAllAnn = structuredClone(allAnnotations)
            tempAllAnn[props.currentImgID].annotations = ann
            setAllAnnotations(tempAllAnn)
        }
    }

    useEffect(() => {
        for (let i = allAnnotations.length; i < props.imgNames.length; i++) {
            setAllAnnotations(allAnnotations => ([...allAnnotations, props.imgNames[i]]))
        }
    }, [props.imgNames]);

    useEffect(() => {
        setAnnotations(allAnnotations[props.currentImgID].annotations)
        var annCounted = structuredClone(annotationsCounted)
        if (!(annCounted.hasOwnProperty(props.currentImgID))) {
            annCounted[props.currentImgID] = {}
        }
        setAnnotationsCounted(annCounted)
    }, [props.currentImgID]);


    useEffect(() => {
        var tempAnn = structuredClone(allAnnotations)
        tempAnn[props.currentImgID].annotations = []
        setAllAnnotations(tempAnn)
        setAnnotations([])
    }, [props.clearAll]);

    const onChange = (annotation) => {
        setAnnotation(annotation);
        if (props.selectorType === 'POINT') {
            onSubmit(annotation)
        }
        setAnnotationToHighlight();
    };


    useEffect(() => {
        allAnnotations.map((image) => {
            if (image.id === props.currentImgID) {
                image.annotations = annotations
            }
        })

        var tempAnn = structuredClone(allAnnotations)
        tempAnn[props.currentImgID].annotations = annotations

        setAllAnnotations(tempAnn)
        props.pullAllAnnotations(allAnnotations)

    }, [annotationId]);

    const onSubmit = (annotation) => {
        const { geometry, data } = annotation;

        var annCounted = structuredClone(annotationsCounted)
        if (annCounted.hasOwnProperty(props.currentImgID)) {
            if (annCounted[props.currentImgID].hasOwnProperty(props.annName)) {
                annCounted[props.currentImgID][props.annName] = annCounted[props.currentImgID][props.annName] + 1
            }
            else {
                console.log(props.annName + " =1")
                annCounted[props.currentImgID][props.annName] = 1
            }
            setAnnotationsCounted(annCounted)
        }
        
        if (!(typeof geometry == 'undefined')) {
            setAnnotation({})
            setAnnotations(annotations.concat({
                geometry: {
                    ...geometry,
                    type: props.selectorType
                },
                data: {
                    text: props.annName,
                    id: annotationId,
                    counter: annotationsCounted[props.currentImgID][props.annName]
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
            className="image"
            renderSelector={props.selectorType == 'RECTANGLE' ? allSelectors.RECTANGLE : (props.selectorType == 'OVAL' ? allSelectors.OVAL : allSelectors.POINT)}
            renderHighlight={({ key, annotation, active }) => {
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
            disableEditor={false}
            onMouseUp={() => { onSubmit(annotation) }}
            activeAnnotations={[annotationToHighlight]}
            allowTouch
        />
    );
}

export default AnnotateImage;