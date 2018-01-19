import * as React from "react";

import { Book } from "./Book";
import { AddForm } from "./AddForm";
import { BookDataProps, BookData, InventoryProps } from "../libs/interfaces";
import axios from "axios";

/**
 * App container
 */
export class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      books: {},
      order: {}
    };
  };

  componentDidMount() {
    this.loadBooksData();
  };

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate ");
    this.storeBooksData(nextState.books);
  };

  private storeBooksData = (data: Object) => {
    let books = JSON.stringify(data);
    let jsonValue = JSON.parse(books);

    axios.post('http://localhost:3000/api/save', jsonValue)
    .then((response)=>{
      console.log(response.data)
    })
    .catch(e=>{console.log(e)});
  }

  private loadBooksData = () => {

    let stateObj = this;
    axios.get('http://localhost:3000/api/get')
    .then(function (response) {
      let storeRefBooks: string = response.data;
      if(storeRefBooks) {
        stateObj.setState({"books": storeRefBooks});
      }
    })
  };

  public removeBook = (key: string) => {
    if(confirm("Are you sure to remove?")) {
      delete this.state.books[key];
      this.setState({books: this.state.books});
    }
  };

  public removeFromOrder = (key: string) => {
    delete this.state.order[key];
    this.setState({ order: this.state.order });
  };

  public addBook = (book: BookData) => {
    let timestamp = (new Date()).getTime();
    this.state.books["book-" + timestamp] = book;
    this.setState({books: this.state.books});
  };
  
  public updateBook = (key: string, orderName: string, attr: string, value: string | number) => {
    this.state.books[key][attr] = value;
    this.state.books[key]['orderName'] = orderName;
    this.setState({books: this.state.books});
  };

  public renderBook = (key: any) => {
    let bookData: BookDataProps = {
      key: key,
      index: key,
      details: this.state.books[key],
      addToOrder: this.addToOrder,
      removeToOrder: this.removeToOrder,
      removeBook: this.removeBook
    };
    return <Book {...bookData}/>;
  };

  public addToOrder = (key: string, name: string) => {
    // this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
    this.updateBook(key, name, 'status', 'unavailable');
  };

  public removeToOrder = (key: string) => {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
    this.updateBook(key, '', 'status', 'available');
  };

  render() {
    
    let inventoryProps: InventoryProps = {
      addBook: this.addBook,
      books: this.state.books,
      updateBook: this.updateBook,
      removeBook: this.removeBook
    };
    return (
      <div className="bookcheckout">
        <div className="menu">
          <ul className="list">
            {Object.keys(this.state.books).map(this.renderBook)}
          </ul>
          <AddForm {...inventoryProps}/>
        </div>
      </div>
    );
  }
}
