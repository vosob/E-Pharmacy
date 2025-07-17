export type Status = "Active" | "Deactive";

export type Suppliers = {
  id: string;
  suppliersInfo: string;
  address: string;
  company: string;
  deliveryDate: Date;
  amount: number;

  status: Status;
};
