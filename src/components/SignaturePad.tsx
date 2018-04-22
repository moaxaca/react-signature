import * as React from "react";
import { ElasticCanvas } from "./ElasticCanvas";

enum States {
  SignatureEngaged,
  Idle,
}

export interface Point {
  x: number,
  y: number,
}

export interface Stroke {
  points: Array<Point>,
}

export interface SignaturePadProps {
  style: any,
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
  private ctx: CanvasRenderingContext2D;

  constructor(props: SignaturePadProps){
    super(props);
    this.state = {
      strokes: [],
      strokeIndex: 0,
      signingState: States.Idle,
    };
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");
    this.canvas.addEventListener('mousemove', this.captureMotion.bind(this));
    this.canvas.addEventListener('mousedown', this.captureEngage.bind(this));
    this.canvas.addEventListener('mouseup', this.captureRelease.bind(this));
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.captureMotion.bind(this));
    this.canvas.removeEventListener('mousedown', this.captureEngage.bind(this));
    this.canvas.removeEventListener('mouseup', this.captureRelease.bind(this));
  }

  getSignature() {
    return this.canvas.toDataURL();
  }

  private captureEngage(event: MouseEvent) {
    this.setState({
      signingState: States.SignatureEngaged,
      strokes: this.state.strokes.concat([{
        points: [],
      }]),
      strokeIndex: this.state.strokes.length,
    });
  }

  private captureMotion(event: MouseEvent) {
    if (this.state.signingState === States.SignatureEngaged) {
      const { strokeIndex } = this.state;
      const strokes: Array<Stroke> = [...this.state.strokes];
      strokes[strokeIndex].points.push({
        x: event.clientX - 10,
        y: event.clientY - 15,
      });
      this.setState({ strokes });
      this.drawSignature();
    }
  }

  private captureRelease(event: MouseEvent) {
    this.setState({
      signingState: States.Idle,
    });
  }

  private resize(height: number, width: number) {
    this.canvas.height = height;
    this.canvas.width = width;
    this.drawSignature();
  }

  private drawSignature() {
    for (let stroke of this.state.strokes) {
      this.drawStroke(stroke);
    }
  }

  private drawStroke(stroke: Stroke) {
    const { ctx } = this;
    let lastPoint;
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
