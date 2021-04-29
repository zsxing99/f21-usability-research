import Item from './Item';
import { useHistory } from 'react-router-dom';
import { requestFor } from './ViewRequests';
import TitleBar from "../components/TitleBar";

import { withTracking } from 'react-tracker';
import { 
  navigateTo,
  markRequestAsDone,
  requestItemClick,
} from "../tracking/events/events";

export default function DeliveryRequest(props) {
  const history = useHistory();
  const itemList = [
    { itemName: "Organic Milk", itemQty: 1 },
    { itemName: "Yogurt", itemQty: 1 },
  ];

  const sentMsg = [
    requestFor +
      ",I am about to get you your groceries for this week, you specified you need: Organic Milk - 1 gallon Yoghurt - 1 Do you want anything changed?",
  ];

  const chat = { title: "Mary's Request", sent: sentMsg, received: [] };
  function handleSubmit(event) {
    event.preventDefault();
  }

  const onItemClick = () => {
    props.trackRequestItemClick();
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
      </div> */}
      <TitleBar
        selected="requests"
        title={requestFor + "'s Request"}
        backPage="/view-volunteer-requests"
      />
      {/* <div className="title">
        <h1> {requestFor}'s Request</h1>
      </div> */}
      {/* <p style={{ textAlign: 'center' }}>10 Dec 2020 6 PM</p> */}
      <div className="body">
        {itemList.map((item) => (
          <div>
            <Item item={item} onClick={onItemClick()}></Item>
          </div>
        ))}
        {/* <div class="table">
          <div>
            <h2>Items List</h2>

            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
              </tr>

              <tr>
                <td>Organic Yoghurt</td>
                <td>1 Lbs</td>
              </tr>
            </table>
          </div> */}
        {/* </div> */}

        <div class="proceed-button" align="center">
          {/* <input
            type="submit"
            className="btn-primary btn"
            value="Process Delivery"
            id="submit"
          ></input> */}
          <button
            onClick={() => {
              history.push({ pathname: '/chat', state: chat });
              props.trackNavigation("REQUEST_CHAT");
            }}
          >
            Process Delivery
          </button>
        </div>
      </div>
    </>
  );
}

const mapTrackingToProps = trackEvent => {
  return {
    trackNavigation: (pageName) =>
      trackEvent(navigateTo(pageName)),
    trackRequestItemClick: () =>
      trackEvent(requestItemClick()),
    trackMarkRequestAsDone: () =>
      trackEvent(markRequestAsDone()),
  }
}

const DeliveryRequestWithTracking = withTracking(mapTrackingToProps)(DeliveryRequest);

export default DeliveryRequestWithTracking;
