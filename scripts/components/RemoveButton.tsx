import React = require("react");
import {RemoveButtonProps} from "../libs/interfaces";

export const RemoveButton = (props: RemoveButtonProps) => (
  <button onClick={props.removeToOrder}>{props.text}</button>
);