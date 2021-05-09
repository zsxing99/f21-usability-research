export default function Item(props) {

  let classVal = "picture";
  if (props.item.itemName.includes("Yogurt")) {
    classVal = classVal + " yogurt";
  } else if (props.item.itemName.includes("Milk")) {
    classVal = classVal + " milk";
  } else if (props.item.itemName.includes("Orange")) {
    classVal = classVal + " orange";
  }
  // console.log(itemList);
  // console.log(props.onClick);

  return (
    <>
      <div class="item" onClick={props.onClick} >
        <div id={props.item.itemName} class={classVal}></div>
        <div class="req-item">
          <div class="item-name">{props.item.itemName}</div>
          <div class="subtext">Qty: {props.item.itemQty}</div>
        </div>
        {/* <h2 class="item-name">{item.item.itemName}</h2>
        <div class="subtext">
          <p class="quantity">{item.item.itemQty}</p> */}
        {/* <div class="action"></div> */}
        {/* </div> */}
      </div>
    </>
  );
}
