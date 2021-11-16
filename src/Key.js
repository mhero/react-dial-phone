import React from "react";

function Key(props) {
  return (
    <li
      onMouseDown={() => props.onMouseDown()}
      onMouseUp={() => props.onMouseUp()}
    >
      {props.value}
    </li>
  );
}
export default Key;
