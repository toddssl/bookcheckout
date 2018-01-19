import * as React from "react";
import { AddButton } from "./AddButton";
import { RemoveButton } from "./RemoveButton";
import { RemoveItemButton } from "./RemoveItemButton";
import { BookDataProps } from "../libs/interfaces";

export class Book extends React.Component<BookDataProps, any> {
  
  private orderNameInput: HTMLInputElement;

  private linkRef = (link: string) => {
    return (ref: any) => {
      this[link] = ref;
    };
  };

  private onButtonClick = () => {
    let orderNameInput = this.orderNameInput.value;
    this.props.addToOrder(this.props.index, orderNameInput);
  };

  private onButtonClick2 = () => {

  };

  private onButtonRemoveClick = () => {
    this.orderNameInput.value = "";
    this.props.removeToOrder(this.props.index);
  };

  private onButtonRemoveItemClick = () => {
    this.props.removeBook(this.props.index);
  };

  render() {

    let details = this.props.details;
    let orderNameInputValue: string = (details.orderName == null ? '' : details.orderName); 

    let isAvailable: boolean = (details.status === "available" ? true : false);
    //let isAvailableRemove: string = (details.status === "available" ? 'display:none' : 'display:block');
    let buttonText: string = (isAvailable ? "Add to Order" : "Sold Out!");
    let buttonRemoveText: string = (isAvailable ? "Nothing" : "Im to Back");
    let buttonRemoveBookText: string = "remove";

    let AddProps = {
      text: buttonText,
      isAvailable: isAvailable,
      addToOrder: this.onButtonClick,
    };

    let RemoveProps = {
      text: buttonRemoveText,
      isAvailable: isAvailable,
      removeToOrder: this.onButtonRemoveClick
    };
    
    let RemoveBookProps = {
      text: buttonRemoveBookText,
      removeBook: this.onButtonRemoveItemClick
    };
    
    return (
      <li className="menu-book">
        <img src={details.image} alt={details.name} />
        <h3 className="book-name">
          {details.name}
        </h3>
        <p>{details.desc}</p>
        name : <input type="text" ref={this.linkRef("orderNameInput")} placeholder="Order Name" defaultValue={orderNameInputValue}></input>
        <AddButton {...AddProps} />
        <RemoveButton {...RemoveProps} />
        <RemoveItemButton {...RemoveBookProps} />
      </li>
    );
  }
}