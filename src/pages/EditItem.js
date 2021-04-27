import { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import Item from "./Item";
import { useHistory } from "react-router-dom";
import TitleBar from "../components/TitleBar";
// import defItemList from "./EditItems";

export let updatedItems = [];
const EditItem = () => {
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

  function handleSaveItem(e) {
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
      history.push({
        pathname: "/edit-item-list",
        state: { itemList: newItems },
      });
    }
  }

  function handleCancel(e) {
    history.push({
      pathname: "/edit-item-list",
    });
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
    history.push({
      pathname: "/edit-item-list",
      state: { itemList: newItems },
    });
  }

  function routeToEditItem(e) {
    console.log(e);
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
                  onChange={(e) => setItemName(e.target.value)}
                  required
                ></Form.Control>
              </Col>
              <Col xs="3">
                <Form.Control
                  type="text"
                  placeholder="Qty"
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
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
export default EditItem;
