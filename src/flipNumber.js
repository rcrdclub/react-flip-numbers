// @flow
import { Animate } from 'react-simple-animate';
import React from 'react';

const commonAnimateStyle = {
  position: 'absolute',
  height: '100%',
  transformStyle: 'preserve-3d',
};
const easeType = 'cubic-bezier(0.19, 1, 0.22, 1)';
const revolutionDegrees = 1;
// const resetRouteCounter = 1000;
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const rotateDegreePerNumber = 0.10;

type Props = {
  position: number,
  length: number,
  height: number,
  color: string,
  background?: string,
  width: number,
  perspective: number,
  duration: number,
  activeNumber: number,
  loop?: number,
  delay: number,
  play: boolean,
  numberStyle: { [string]: string | number },
};

type State = {
  degree: number,
  rotateCounter: number,
};

const calculateDegrees = (rotateCounter, activeNumber, loop = 0) => {
  let animateDegree = numbers.findIndex(v => v === activeNumber) * rotateDegreePerNumber + loop * revolutionDegrees;

  animateDegree += rotateCounter;

  return {
    rotateCounter: rotateCounter + loop * revolutionDegrees,
    degree: - animateDegree,
  };
};

export default class FlipNumber extends React.Component<Props, State> {
  static defaultProps = {
    loop: 0,
  }

  static getDerivedStateFromProps({ activeNumber, loop }: Props, { rotateCounter }: State) {
    return calculateDegrees(rotateCounter, activeNumber, loop);
  }

  state = {
    degree: 0,
    rotateCounter: 0, // eslint-disable-line react/no-unused-state
  };

  updateNumberTimeout: TimeoutID;

  componentDidMount() {
    this.updateNumberTimeout = setTimeout(() => this.updateNumber(), 50 * this.props.position);
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.activeNumber !== this.props.activeNumber ||
      nextProps.height !== this.props.height ||
      nextProps.width !== this.props.width ||
      this.state.degree === 0 ||
      nextProps.play !== this.props.play
    );
  }

  componentWillUnmount() {
    clearTimeout(this.updateNumberTimeout);
  }

  updateNumber = () => {
    this.setState(({ rotateCounter }) => calculateDegrees(rotateCounter, this.props.activeNumber, this.props.loop));
  }

  render() {
    const {
      activeNumber,
      height,
      color,
      background,
      width,
      perspective,
      duration,
      play,
      delay,
      length,
      position,
      numberStyle = {},
    } = this.props;
    const { degree } = this.state;
    const viewPortSize = {
      width: `${width}px`,
      height: `${height + 3}px`,
    };
    const halfElementHeight = height / 2;
    const translateZ = halfElementHeight + height;

    return (
      <span
        style={{
          ...viewPortSize,
          perspective,
          overflow: 'hidden',
          display: 'inline-block',
          textAlign: 'left',
          height,
        }}
        aria-hidden
      >
        <Animate
          tag="span"
          play={play}
          start={{
            ...commonAnimateStyle,
          }}
          end={{
            ...commonAnimateStyle,
            transform: `rotateX(${degree}turn)`,
          }}
          {...{ easeType, duration, delay }}
          render={({ style }) => (
            <span style={style}>
              {numbers.map((n, i) => (
                <span
                  style={{
                    ...viewPortSize,
                    height,
                    lineHeight: `${height}px`,
                    fontSize: `${height - 1}px`,
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    WebkitFontSmoothing: 'antialiased',
                    color,
                    background,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: `rotateX(${rotateDegreePerNumber * i}turn) translateZ(${translateZ}px)`,
                    ...numberStyle,
                  }}
                  key={`${rotateDegreePerNumber * i}`}
                >
                  {n}
                </span>
              ))}
            </span>
          )}
        />

        <span
          data={length - position}
          style={{
            ...viewPortSize,
            height,
            lineHeight: `${height}px`,
            fontSize: `${height - 1}px`,
            left: `${length - position > 4 ? 0.25 : 0}px`, // hacky fix for weird misalignment in Chrome.
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            WebkitFontSmoothing: 'antialiased',
            color,
            background,
            transform: `rotateX(0turn) translateZ(${translateZ}px)`,
            visibility: 'hidden',
            ...numberStyle,
          }}
        >
          {activeNumber}
        </span>
      </span>
    );
  }
}
