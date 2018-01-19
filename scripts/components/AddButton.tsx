import React = require("react");
import {AddButtonProps} from "../libs/interfaces";

export const AddButton = (props: AddButtonProps) => (
  <button disabled={!props.isAvailable} onClick={props.addToOrder}>{props.text}</button>
);
