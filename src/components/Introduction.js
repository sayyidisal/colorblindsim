import { h, Component } from "preact";
import VideoIcon from "preact-feather/dist/icons/video";

import { isSupported, BROWSER_UNSUPPORTED, NO_CAMERA } from "../support";
import logoUrl from "../img/logo.svg";

class Introduction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSupport: false,
      noSupportReason: null,
      supportChecked: false,
    };
  }

  componentDidMount() {
    isSupported()
      .then(() => this.setState({ hasSupport: true, supportChecked: true }))
      .catch(reason =>
        this.setState({ noSupportReason: reason, supportChecked: true }),
      );
  }

  renderSupportMessage() {
    const { noSupportReason } = this.state;
    let message;

    switch (noSupportReason) {
      case BROWSER_UNSUPPORTED:
        message = "Unfortunately, your browser does not support this app.";
        break;
      case NO_CAMERA:
        message =
          "No cameras have been found for this device. Please connect a webcam or open this app on a device with cameras (like most smartphones)";
        break;
    }

    if (message) {
      return <p>{message}</p>;
    }

    return null;
  }

  render(props, { hasSupport, noSupportReason, supportChecked }) {
    const shouldShowCompatibility = !window.inPrerender;

    return (
      <section {...props}>
        <h1>
          <span class="logo">
            <img src={logoUrl} alt="" />
          </span>
          <span>ColorBlindSim</span>
        </h1>
        <p>
          Color blindness affects approximately 1 in 20 people of the world
          population. Experience the world as they do, right from your browser.
        </p>
        <noscript>
          <p>
            ColorBlindSim requires JavaScript to be enabled in order to work.
            Please enable JavaScript and refresh the page, or switch to a
            browser with JavaScript enabled.
          </p>
        </noscript>
        {shouldShowCompatibility && this.renderSupportMessage()}
        {shouldShowCompatibility &&
          supportChecked &&
          hasSupport && (
            <div>
              <a class="get-started" href="#app">
                Get started <VideoIcon class="get-started__icon" size={24} />
              </a>
            </div>
          )}
      </section>
    );
  }
}

export default Introduction;
