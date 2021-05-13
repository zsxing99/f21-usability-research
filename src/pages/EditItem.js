import { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import Item from "./Item";
import { useHistory } from "react-router-dom";
import TitleBar from "../components/TitleBar";
// import defItemList from "./EditItems";

import { withTracking } from "react-tracker";
import {
  navigateTo,
  requestItemDetailChange,
  requestItemDetailSubmit,
  requestItemDetailCancel,
  requestItemDelete,
} from "../tracking/events/events";
import { propTypes } from "react-bootstrap/esm/Image";

export let updatedItems = [];
const EditItem = (props) => {
  const history = useHistory();
  const [itemName, setItemName] = useState(
    history.location.state.item.itemName
  );
  console.log(history.location.state);
  const [itemQty, setItemQty] = useState(history.location.state.item.itemQty);
  const originalName = history.location.state.item.itemName;
  const originalQty = history.location.state.item.itemQty;
  const [itemList, setItemList] = useState(history.location.state.itemList);
  console.log(history.location.state);
  const requestFor = history.location.state.requestFor;

  function handleSaveItem(e) {
    console.log(typeof itemQty);
    if (itemName && itemQty) {
      //  Remove the original item
      const newItems = [];
      history.location.state.itemList.forEach((i) => {
        if (i.itemName != originalName) {
          newItems.push(i);
        } else {
          newItems.push({ itemName, itemQty });
        }
      });
      console.log(newItems);
      updatedItems = newItems;
      window.localStorage.setItem(
        requestFor + "-item-list",
        JSON.stringify(newItems)
      );
      history.push({
        pathname: "/edit-item-list",
        state: { requestFor },
      });
    } else {
      alert("Please enter proper information in all the fields");
    }

    props.trackRequestItemDetailSubmit();
  }

  function handleCancel(e) {
    history.push({
      pathname: "/edit-item-list",
      state: { requestFor },
    });

    props.trackRequestItemDetailCancel();
  }

  function handleDeleteItem(e) {
    const newItems = [];
    history.location.state.itemList.forEach((i) => {
      if (i.itemName != originalName) {
        newItems.push(i);
      }
    });
    console.log(newItems);
    updatedItems = newItems;
    window.localStorage.setItem(
      requestFor + "-item-list",
      JSON.stringify(newItems)
    );
    history.push({
      pathname: "/edit-item-list",
      state: { requestFor },
    });

    props.trackRequestItemDelete();
  }

  return (
    <>
      {/* <div class="library-fontello">
        <i class="icon-left-open back" onClick={handleCancel}></i>
      </div>
      <div class="title">Edit Items</div> */}
      <TitleBar selected="requests" title="Edit Item" />
      <div align="center" class="body">
        <div className="edit-item-form">
          <Form>
            <Form.Row>
              <Col xs="7">
                <Form.Control
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                    props.trackRequestItemDetailChange();
                  }}
                  required
                ></Form.Control>
              </Col>
              <Col xs="3">
                <Form.Control
                  type="number"
                  placeholder="Qty"
                  value={itemQty}
                  onChange={(e) => {
                    setItemQty(e.target.value);
                    props.trackRequestItemDetailChange();
                  }}
                  required
                ></Form.Control>
              </Col>
              <Col xs="2"></Col>
            </Form.Row>
            {/* <Form.Row align="center">
            <div class="edit-item-button">
              <button onClick={handleSaveItem}>Save</button>
            </div>
            <div class="edit-item-button">
              <button onClick={handleDeleteItem}>Delete</button>
            </div>
            <div class="edit-item-button">
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </Form.Row> */}
          </Form>
        </div>
        <div align="center" className="edit-item-actions">
          <div className="edit-item-button">
            <button onClick={handleSaveItem}>Save</button>
          </div>
          <div className="edit-item-button">
            <button onClick={handleDeleteItem}>Delete</button>
          </div>
          <div className="edit-item-button">
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapTrackingToProps = (trackEvent) => {
  return {
    trackRequestItemDetailChange: () => trackEvent(requestItemDetailChange()),

    trackRequestItemDetailSubmit: () => trackEvent(requestItemDetailSubmit()),

    trackRequestItemDetailCancel: () => trackEvent(requestItemDetailCancel()),

    trackRequestItemDelete: () => trackEvent(requestItemDelete()),
  };
};

const EditItemWithTracking = withTracking(mapTrackingToProps)(EditItem);

export default EditItemWithTracking;
