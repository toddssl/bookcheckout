export interface BookDataProps {
  key: number;
  index: string;
  details: BookData;
  addToOrder(key: string, name: string);
  removeToOrder(key: string);
  removeBook(key: string);
}

export interface AddButtonProps {
  text: string;
  isAvailable: boolean;
  addToOrder();
}

export interface RemoveButtonProps {
  text: string;
  isAvailable: boolean;
  removeToOrder();
}

export interface RemoveItemButtonProps {
  text: string;
  removeBook();
}

export interface BookData {
  name: string;
  orderName: string;
  // price: number;
  status: string;
  desc: string;
  image: string;
}

export interface InventoryProps {
  addBook(book: BookData);
  books: Object;
  updateBook(key: string, orderName: string, attr: string, value: string | number);
  removeBook(key: string);
}