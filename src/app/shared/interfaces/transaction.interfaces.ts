export interface TransactionDetail {
    transactionId: string;
    gameId: string;
    price: number;
  }
  
  export interface Transaction {
    id: string;
    userId: string;
    totalPrice: number;
    transactionDate: string;
    details: TransactionDetail[];
  }
  