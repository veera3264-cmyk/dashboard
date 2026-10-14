export interface Purchase {
  id: number;
  locationId: string | number;
  locationName?: string;
  organization: string;
  purchaseDate: string;
  purchaseAmount: number | null;
  invoiceDate: string | null;
  invoiceAmount: number | null;
  vendor: string;
  payment: string;
  invoice: string | null;
  comments: string | null;
  createdOn: string | null;
  aging: number | null;
  possibleDuplicate: string | null;
  action?: string | null;
}
