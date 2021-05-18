import Item from "./Item";
import { useHistory } from "react-router-dom";
import { requestFor } from "./ViewRequests";
import TitleBar from "../components/TitleBar";

import { withTracking } from "react-tracker";
import {
  navigateTo,
  markRequestAsDone,
  requestItemClick,
} from "../tracking/events/events";

export let initialItems = [];
function DeliveryRequest2(props) {
  const history = useHistory();
  const sentMsg = [
    "Hi " +
      requestFor +
      ", I am about to get you your groceries. Do you want anything changed? I will let you know if anything is unavailable.",
  ];

  const receivedMsgs =
    requestFor === "Walt"
      ? [
          "Hi! \n Could you make it just 1 milk please? Rest everything looks good, thank you so much!",
        ]
      : [];

  const chat = {
    title: requestFor + "'s Request",
    sent: sentMsg,
    received: receivedMsgs,
  };
  const defaultItemList = [
    { itemName: "Organic Milk", itemQty: 2 },
    { itemName: "Orange", itemQty: 12 },
  ];
  const itemList = window.localStorage.getItem(requestFor + "-item-list")
    ? JSON.parse(window.localStorage.getItem(requestFor + "-item-list"))
    : defaultItemList;

  initialItems = itemList;
  function handleSubmit(event) {
    if (
      !event.target.elements.milk_available.checked ||
      !event.target.elements.yoghurt_available.checked
    ) {
      alert(
        "You have not checked all the items. Are you sure you want to mark the Request as Done?"
      );
      history.push("/view-volunteer-requests");
    } else if (
      event.target.elements.milk_available.checked &&
      event.target.elements.yoghurt_available.checked
    ) {
      alert(" Are you sure you want to mark the Request as Done?");
      history.push("/view-volunteer-requests");
    }
    event.preventDefault();
  }

  function clickDone() {
    alert(" Are you sure you want to mark the Request as Done?");
    history.push("/");
    props.trackMarkRequestAsDone();
  }

  function onClickItem() {
    props.trackRequestItemClick();
  }

  return (
    <>
      <TitleBar
        selected="requests"
        title={requestFor + "'s Request"}
        backPage="/view-volunteer-requests"
      />
      {/* <p style={{ textAlign: 'center' }}>8 Dec 2020 6 PM</p> */}
      <div className="body">
        {initialItems.map((item) => (
          <div>
            <Item item={item} onClick={onClickItem}></Item>
          </div>
        ))}
      </div>

      <div align="center" className="edit-item-actions">
        <div className="edit-item-button">
          <button
            onClick={() => {
              history.push({
                pathname: "/edit-item-list",
                state: {
                  requestFor: requestFor,
                },
              });
              props.trackNavigation("EDIT_REQUEST_ITEMS");
            }}
          >
            Edit
          </button>
        </div>
        <div className="edit-item-button">
          <button
            onClick={() => {
              history.push({ pathname: "/chat", state: chat });
              props.trackNavigation("REQUEST_CHAT");
            }}
          >
            Chat
          </button>
        </div>
        <div className="edit-item-button">
          <button onClick={clickDone}>Done</button>
        </div>
      </div>
    </>
  );
}

const mapTrackingToProps = (trackEvent) => {
  return {
    trackNavigation: (pageName) => trackEvent(navigateTo(pageName)),
    trackRequestItemClick: () => trackEvent(requestItemClick()),
    trackMarkRequestAsDone: () => trackEvent(markRequestAsDone()),
  };
};

const DeliveryRequest2WithTracking =
  withTracking(mapTrackingToProps)(DeliveryRequest2);

export default DeliveryRequest2WithTracking;
