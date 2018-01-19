import * as React from "react";
import { BookData } from "../libs/interfaces";

//Interfaces
interface AddProps {
  addBook(book: BookData);
}

export class AddForm extends React.Component<AddProps, any> {
  
  private bookForm: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private priceInput: HTMLInputElement;
  private statusOption: HTMLSelectElement;
  private descText: HTMLTextAreaElement;
  private imageInput: HTMLInputElement;

  private linkRef = (link: string) => {
    return (ref: any) => {
      this[link] = ref;
    };
  };

  private createBook = (event: React.FormEvent<any>) => {
    event.preventDefault();
    let book: BookData = {
      name  : this.nameInput.value,
      orderName : '',
      // price : parseInt(this.priceInput.value),
      // status: this.statusOption.value,
      status: 'available',
      desc  : this.descText.value,
      image : this.imageInput.value
    };
    this.props.addBook(book);
    this.bookForm.reset();
  };

  render() {
    return (
      <form className="book-edit" ref={this.linkRef("bookForm")} onSubmit={this.createBook}>
        <input type="text" ref={this.linkRef("nameInput")} placeholder="Name"/>       
        <textarea ref={this.linkRef("descText")} placeholder="Desc"></textarea>
        <input type="text" ref={this.linkRef("imageInput")} placeholder="URL to Image" />
        <button type="submit">Add a book</button>
      </form>
    );
  }
}