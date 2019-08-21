export class IncomeExpense {
  description: string;
  amount: number;
  type: string;
  uid?: string;

  constructor(description: string, amount: number, type: string) {
    this.description = description;
    this.amount = amount;
    this.type = type;
  }
}
