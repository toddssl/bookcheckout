import React = require("react");
import {RemoveItemButtonProps} from "../libs/interfaces";

export const RemoveItemButton = (props: RemoveItemButtonProps) => (
  <button onClick={props.removeBook}>{props.text}</button>
);