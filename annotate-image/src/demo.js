import React, { Component } from "react";
import Annotation from "react-image-annotation";
import Root from "react-image-annotation";
import img from "../src/images/IMG_2640.JPG";

export default class Simple extends Component {
  state = {
    annotations: [],
    annotation: {}
  };

  onChange = annotation => {
    this.setState({ annotation });
  };

  onSubmit = annotation => {
    const { geometry, data } = annotation;

    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    });
  };

  render() {
    console.log(this.state.annotations);
    return (
      // <Root>
      <Annotation
        src={img}
        alt="Two pebbles anthropomorphized holding hands"
        annotations={this.state.annotations}
        type={this.state.type}
        value={this.state.annotation}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        allowTouch
      />
      // </Root>
    );
  }
}