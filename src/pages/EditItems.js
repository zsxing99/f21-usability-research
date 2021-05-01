import { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import Item from "./Item";
import { useHistory } from "react-router-dom";
import { updatedItems } from "./EditItem";
import { initialItems } from "./DeliveryRequest2";
import TitleBar from "../components/TitleBar";

import { withTracking } from 'react-tracker';
import {
  navigateTo,
  newRequestItemDetailChange,
  newRequestItemDetailSubmit,
} from '../tracking/events/events';

export let editedItems = [];

function EditItems(props) {
  const history = useHistory();
  let generalList = updatedItems.length == 0 ? initialItems : updatedItems;
  const [itemList, setItemList] = useState(generalList);

  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState();

  function handleAddItem(e) {
    console.log(itemList);
    e.preventDefault();
    console.log(e);
    if (itemName && itemQty) {
      setItemList([...itemList, { itemName, itemQty }]);
      setItemName("");
      setItemQty("");
    } else alert("Please enter information in all the fields");
    
    props.trackNewRequestItemDetailSubmit();
  }

  return (
    <>
      {/* <div class="library-fontello">
        <i
          class="icon-left-open back"
          onClick={() => {
            editedItems = itemList;
            history.push('/delivery-request-active');
          }}
        ></i>
      </div>
      <div class="title">Edit Items</div> */}
      <TitleBar
        selected="requests"
        title={"Edit Items"}
        backPage="/delivery-request-active"
      />
      <div class="body">
        <Form>
          <Form.Row>
            <Col xs="7">
              <Form.Control
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                  props.trackNewRequestItemDetailChange();
                }}
                required
              ></Form.Control>
            </Col>
            <Col xs="3">
              <Form.Control
                type="text"
                placeholder="Qty"
                value={itemQty}
                onChange={(e) => {
                  setItemQty(e.target.value);
                  props.trackNewRequestItemDetailChange();
                }}
                required
              ></Form.Control>
            </Col>
            <Col xs="2">
              <button type="submit" onClick={handleAddItem}>
                Add
              </button>
            </Col>
          </Form.Row>
        </Form>
        {itemList.map((item) => (
          <div
            onClick={() => {
              history.push({
                pathname: "/edit-item-list/item",
                state: { item, itemList },
              });
              props.trackNavigation("EDIT_REQUEST_ITEM_DETAILS");
            }}
          >
            <Item item={item}></Item>
          </div>
        ))}
      </div>
    </>
  );
}

const mapTrackingToProps = trackEvent => {
  return {
    trackNavigation: (pageName) =>
      trackEvent(navigateTo(pageName)),
    
    trackNewRequestItemDetailChange: () =>
      trackEvent(newRequestItemDetailChange()),    

    trackNewRequestItemDetailSubmit: () =>
      trackEvent(newRequestItemDetailSubmit()),

  }
};

const EditItemsWithTracking = withTracking(mapTrackingToProps)(EditItems);

export default EditItemsWithTracking;