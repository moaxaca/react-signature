import * as React from "react";

export interface ElasticContainerState {
  height: number,
  width: number,
}

export interface ElasticContainerProps {
  children: JSX.Element,
  resize: (height: number, width: number) => void,
  height: number,
  width: number,
}

export class ElasticContainer extends React.Component<ElasticContainerProps, ElasticContainerState> {
  private container: HTMLDivElement;

  constructor(props: ElasticContainerProps){
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  resize() {
    if (this.container) {
      const height = this.props.height || this.container.clientHeight;
      const width = this.props.width || this.container.clientWidth;
      this.props.resize(height, width);
    }
  }

  render() {
    return (
      <div ref={(ref) => this.container = ref}>
        {this.props.children}
      </div>
    )
  }
}
