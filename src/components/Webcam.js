import { h, Component } from "preact";

export default class Webcam extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.initFacingMode(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initFacingMode(nextProps);
  }

  initFacingMode(props) {
    const { facingMode = "environment" } = props;
    const constraints = {
      video: {
        facingMode,
      },
    };

    window.navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      this.stream = stream;
      this.initStream();
    });
  }

  initVideo(el) {
    this.video = el;
    this.initStream();
  }

  initStream() {
    if (this.video && this.stream) {
      this.video.srcObject = this.stream;
      this.video.addEventListener("loadedmetadata", e => {
        this.video.play();
      });
    }
  }

  render({ facingMode, ...otherProps }) {
    return <video {...otherProps} ref={el => this.initVideo(el)} />;
  }
}
