import { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useHistory } from "react-router-dom";

import { withTracking } from 'react-tracker';
import { navigateBack } from '../tracking/events/events';

function Chat(props) {
  const history = useHistory();
  const [chatTitle, setChatTitle] = useState(history.location.state.title);
  const [receivedMsg, setReceivedMsg] = useState(
    history.location.state.received
  );
  const [sentMsg, setSentMsg] = useState(history.location.state.sent);
  return (
    <>
      <div className="library-fontello">
        {/* <div class="back"> */}
        <i
          className="icon-left-open back"
          onClick={() => {
            history.push("/delivery-request-active");
            props.trackBackNavigation();
          }}
        ></i>
        {/* </div> */}
      </div>
      {/* <div class="chat-header"></div> */}
      <div class="title">
        <h1>{chatTitle}</h1>
      </div>
      {/* <div class="received-message">{receivedMsg[0]}</div> */}
      {/* <div class="received-message">{receivedMsg[0]}</div> */}
      {/* <div class="received-msg-timestamp">12/7/2020 1:48 AM</div> */}
      <div class="sent-text">
        <div class="sent-message">{sentMsg[0]}</div>
        <div class="sent-msg-timestamp">12/7/2020 1:48 AM</div>
      </div>
      <textarea
        class="text-input"
        rows="1"
        cols="40"
        name="textarea"
      ></textarea>
      <div class="send-button">Send</div>
    </>
  );
}

const mapTrackingToProps = trackEvent => {
  return {
    trackBackNavigation: () =>
      trackEvent(navigateBack()),
  }
};

const ChatWithTracking = withTracking(mapTrackingToProps)(Chat);

export default ChatWithTracking;
