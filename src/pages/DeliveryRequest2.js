import Item from "./Item";
import { useHistory } from "react-router-dom";
import { editedItems } from "./EditItems";
import { requestFor } from "./ViewRequests";

export let initialItems = [];
export default function DeliveryRequest2() {
  const history = useHistory();
  const sentMsg = [
    requestFor +
      ",I am about to get you your groceries for this week, you specified you need: Organic Milk - 1 gallon Yoghurt - 1 Do you want anything changed?",
  ];

  const chat = {
    title: requestFor + "'s Request",
    sent: sentMsg,
    received: [],
  };
  const itemList = [
    { itemName: "Organic Milk", itemQty: 1 },
    { itemName: "Orange", itemQty: 1 },
  ];
  console.log("Edited Items", editedItems);
  //   if (editedItems.length == 0) initialItems = itemList;
  //   else initialItems = editedItems;
  initialItems = editedItems.length == 0 ? itemList : editedItems;
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
    history.push("/view-volunteer-requests");
  }
  function callAlert() {
    // alert(" Are you sure you want to Call? Standard Carrier charges apply!");
    // TODO: Disable volunteer and Redirect to Dashboard
    // history.push("/delivery-request-active");
    history.push("/info");
  }
  return (
    <>
      <div className="library-fontello">
        <i
          className="icon-left-open back"
          onClick={() => {
            history.push("/view-volunteer-requests");
          }}
        ></i>
      </div>
      <div className="title">
        <h1> {requestFor}'s Request</h1>
      </div>
      {/* <p style={{ textAlign: 'center' }}>8 Dec 2020 6 PM</p> */}
      <div className="body">
        {initialItems.map((item) => (
          <div>
            <Item item={item}></Item>
          </div>
        ))}
        <div class="proceed-button" align="center">
          <input
            onClick={() => history.push("/edit-item-list")}
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
