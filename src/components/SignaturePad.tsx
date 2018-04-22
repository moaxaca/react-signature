import * as React from "react";
import { ElasticCanvas } from "./ElasticCanvas";
import { Stroke } from "../types/Stroke";

enum States {
  Engaged,
  Idle,
}

export interface SignaturePadProps {
  height: number,
  width: number,
}

export interface SignaturePadState {
  strokes: Array<Stroke>,
  strokeIndex: number,
  signingState: States,
}

export class SignaturePad extends React.Component<SignaturePadProps, SignaturePadState> {
  private canvas: HTMLCanvasElement;

  constructor(props: SignaturePadProps){
    super(props);
    this.state = {
      strokes: [],
      strokeIndex: 0,
      signingState: States.Idle,
    };
  }

  componentDidMount() {
    this.canvas.addEventListener('mousemove', this.captureMotion.bind(this));
    this.canvas.addEventListener('mousedown', this.captureEngage.bind(this));
    this.canvas.addEventListener('mouseup', this.captureRelease.bind(this));
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.captureMotion.bind(this));
    this.canvas.removeEventListener('mousedown', this.captureEngage.bind(this));
    this.canvas.removeEventListener('mouseup', this.captureRelease.bind(this));
  }

  toDataURL() {
    if (this.state.strokes.length === 0) {
      return null;
    }
    return this.canvas.toDataURL();
  }

  clear() {
    this.setState(
      {
        strokes: [],
        strokeIndex: 0,
      },
      () => {
        const { canvas } = this;
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    );
  }

  private captureEngage() {
    this.setState({
      strokes: this.state.strokes.concat([{
        points: [],
      }]),
      strokeIndex: this.state.strokes.length,
      signingState: States.Engaged,
    });
  }

  private captureMotion(event: MouseEvent) {
    if (this.state.signingState === States.Engaged) {
      const { strokeIndex } = this.state;
      const strokes: Array<Stroke> = [...this.state.strokes];
      strokes[strokeIndex].points.push({
        x: event.clientX - 10,
        y: event.clientY - 15,
      });
      this.setState({ strokes });
      this.draw();
    }
  }

  private captureRelease() {
    this.setState({
      signingState: States.Idle,
    });
  }

  private resize(height: number, width: number) {
    this.canvas.height = height;
    this.canvas.width = width;
    this.draw();
  }

  private draw() {
    for (let stroke of this.state.strokes) {
      this.drawStroke(stroke);
    }
  }

  private drawStroke(stroke: Stroke) {
    const ctx = this.canvas.getContext("2d");
    let lastPoint;
    ctx.beginPath();
    for (let point of stroke.points) {
      ctx.moveTo(point.x,point.y);
      if (lastPoint) {
        ctx.lineTo(lastPoint.x,lastPoint.y);
      }
      lastPoint = point;
    }
    ctx.closePath();
    ctx.stroke();
  }

  render() {
    return (
      <ElasticCanvas
        resize={(height, width) => this.resize(height, width)}
        ref={(ref: HTMLCanvasElement) => this.canvas = ref}
        height={this.props.height}
        width={this.props.width}
      />
    );
  }
}
