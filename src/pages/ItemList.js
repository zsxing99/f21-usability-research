import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Item from './Item';

export default function ItemList(props) {
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState();
  const [itemList, setItemList] = useState([]);

  function handleAddItem(e) {
    e.preventDefault();
    console.log(e.target);
    setItemList([...itemList, { itemName: itemName, itemQty: itemQty }]);
    console.log(itemList);
    setItemName('');
    setItemQty('');
  }
  return (
    <>
      <div class="back">
        <div class="library-fontello">
          <i
            class="icon-left-open"
            onClick={() => {
              props.history.push('/user-home');
            }}
          ></i>
        </div>
      </div>
      <div class="title">Item List</div>
      <div class="body">
        <Form>
          <Form.Row className="align-items-center">
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
            <Col xs="2">
              <div class="library-fontello">
                <i
                  class="icon-plus-circled"
                  style={{ fontSize: '30px' }}
                  onClick={handleAddItem}
                ></i>
              </div>
            </Col>
          </Form.Row>
        </Form>
        <div style={{ height: '70vh' }}>
          {itemList.map((item) => (
            <div>
              <Item item={item}></Item>
            </div>
          ))}
        </div>
        <Link to={{ pathname: '/new-request/form', state: { itemList } }}>
          <Button style={{ float: 'right' }}>Continue</Button>
        </Link>
      </div>
    </>
  );
}
