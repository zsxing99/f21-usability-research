import Item from "./Item";
import { useHistory } from "react-router-dom";
import { editedItems } from "./EditItems";
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

  console.log("Edited Items", editedItems);

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

  function callAlert() {
    // alert(" Are you sure you want to Call? Standard Carrier charges apply!");
    // TODO: Disable volunteer and Redirect to Dashboard
    // history.push("/delivery-request-active");
    history.push("/info");
    props.trackNavigation("HELP");
  }

  return (
    <>
      {/* <div className="library-fontello">
        <i
          className="icon-left-open back"
          onClick={() => {
            history.push("/view-volunteer-requests");
          }}
        ></i>
      </div>
      <div className="title">
        <h1> {requestFor}'s Request</h1>
      </div> */}
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
        <div class="proceed-button" align="center">
          <input
            onClick={() => {
              // history.push("/edit-item-list", requestFor);
              history.push({
                pathname: "/edit-item-list",
                // search: "?update=true", // query string
                state: {
                  requestFor: requestFor,
                  // items: initialItems,
                },
              });
              props.trackNavigation("EDIT_REQUEST_ITEMS");
            }}
            type="submit"
            className="btn-primary btn"
            value="Edit Items"
            id="submit"
          ></input>
        </div>
      </div>
      {/* <div class="table">
        <table>
          <thead>
            <tr>
              <th>
                <div className="library-fontello">
                  <i class="icon-comment-alt"></i> Chat{" "}
                </div>
              </th>
              <th>
                <div className="library-fontello">
                  <i class="icon-phone"></i> Call{" "}
                </div>
              </th>
              <th>
                <div className="library-fontello">
                  <i class="icon-basket"></i> Done{" "}
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div> */}

      <div class="end">
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>
                  <div
                    className="library-fontello"
                    onClick={() => {
                      history.push({ pathname: "/chat", state: chat });
                      props.trackNavigation("REQUEST_CHAT");
                    }}
                  >
                    <i class="icon-comment-alt"></i> Chat{" "}
                  </div>
                </th>
                <th>
                  <div className="library-fontello" onClick={callAlert}>
                    <i class="icon-help-circled"></i> Help{" "}
                  </div>
                </th>
                <th>
                  <div className="library-fontello" onClick={clickDone}>
                    <i className="icon-basket"></i> Done{" "}
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>

    // <>
    //     <div className="library-fontello">
    //         <i
    //             className="icon-left-open back"
    //             // onClick={() => {
    //             //     history.push('/item-list');
    //             // }}
    //         ></i>
    //     </div>
    //     <div className="title">
    //         <h2> Mary's Request</h2>
    //         <h3>07 Dec 2020 6 PM</h3>

    //     </div>

    //     <div className="body">

    //             <div class="table">

    //             <div>
    //             <h2>Items List</h2>

    //             <table>
    //             <thead>
    //                 <tr>
    //                     <th>Item</th>
    //                     <th>Quantity</th>
    //                     <th>Available</th>

    //                   </tr>
    //                 </thead>

    //                 <tr>
    //                     <td>Organic Milk</td>
    //                     <td>1 Gallon</td>
    //                     <td><div>
    //                 <input type="checkbox" id="milk_available" name="milk" className="input-checkbox" />

    //             </div> </td>

    //                 </tr>

    //                 <tr>
    //                     <td>Organic Yoghurt</td>
    //                     <td>1 Lbs</td>
    //                     <td><div>
    //                 <input type="checkbox" id="yoghurt_available" name="yoghurt" className="input-checkbox" />

    //             </div> </td>

    //                 </tr>

    //                 </table>
    //                 </div>

    //             </div>

    //             <div align="center">
    //             <div align="center">
    //                 <input type="submit" className="btn-primary btn" value="Edit Items" id="submit"></input>
    //             </div>

    //             </div>
    //             <div class="table">
    //             <table>
    //             <thead>
    //                 <tr>

    //                     <th><div className="library-fontello">
    //             <i class="icon-comment-alt"></i> Chat </div></th>
    //             <th><div className="library-fontello">
    //             <i class="icon-phone"></i> Call </div></th>
    //             <th><div className="library-fontello">
    //             <i class="icon-basket"></i> Done </div></th>

    //                   </tr>
    //                 </thead>

    //         </table>
    //         </div>
    //     </div>
    // </>
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
