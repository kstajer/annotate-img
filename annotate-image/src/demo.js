import {React, useState, useEffect} from 'react'
import Annotation from "react-image-annotation";
import Root from "react-image-annotation";

function Simple({img}){

    const [annotation, setAnnotation]= useState({})
    const [annotations, setAnnotations]= useState([])

    useEffect(() => {
        console.log(annotation, annotations)
      }, [annotation, annotations]);

    const onChange = (annotation) => {
        setAnnotation(annotation);
    };

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

        console.log(annotations)
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

export default Simple;