import * as React from "react";
import { ElasticContainer } from './ElasticContainer';

export interface ElasticCanvasProps {
  resize: (height: number, width: number) => void,
  height: number,
  width: number,
}

export const ElasticCanvas = React.forwardRef((props: ElasticCanvasProps, ref: any) => (
  <ElasticContainer height={props.height} width={props.width} resize={props.resize}>
    <canvas ref={ref} />
  </ElasticContainer>
));
