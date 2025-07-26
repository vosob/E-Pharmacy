import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import type { Suppliers } from "@/types/suppliers";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

type Props = {
  tableData: Suppliers[];
  handleUpdateSuppler: (data: Suppliers) => void;
};

export const SuppliersTable = ({ tableData, handleUpdateSuppler }: Props) => {
  return (
    <div className="mt-5 px-5">
      <h1 className="bg-[#E7F1ED] p-5 rounded-t-xl text-[18px] text[#1D1E21] font-semibold">
        All Suppliers
      </h1>
      <Table className="w-full">
        <TableHeader className="text-white">
          <TableRow>
            <TableHead className="text-[#1D1E2166] border-x p-5">
              Suppliers Info
            </TableHead>
            <TableHead className="text-[#1D1E2166] border-r p-5">
              Address
            </TableHead>
            <TableHead className="text-[#1D1E2166] border-r p-5">
              Company
            </TableHead>
            <TableHead className="text-[#1D1E2166] border-r p-5">
              Delivery date
            </TableHead>
            <TableHead className="text-[#1D1E2166] border-r p-5">
              Amount
            </TableHead>
            <TableHead className="text-[#1D1E2166] border-r p-5">
              Status
            </TableHead>
            <TableHead className="text-[#1D1E2166] border-r p-5">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(tableData) &&
            tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-5 pl-5 border-x border-b  text-[16px] font-medium ">
                  {item.suppliersInfo}
                </TableCell>
                <TableCell className="py-5 pl-5 border-r border-b text-[16px] font-medium">
                  {item.address}
                </TableCell>
                <TableCell className="py-5 pl-5 border-r border-b text-[16px] font-medium">
                  {item.company}
                </TableCell>
                <TableCell className="py-5 pl-5 border-r border-b text-[16px] font-medium">
                  {new Date(item.deliveryDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-5 pl-5 border-r border-b text-[16px] font-medium">
                  {item.amount}
                </TableCell>
                <TableCell className="py-5 pl-5 border-r border-b text-[16px] font-medium">
                  <span
                    className={`px-3 min-w-22.5 bg-[#E7F1ED] text-center inline-block py-1 rounded-xl border text-sm font-semibold ${
                      item.status === "Deactive"
                        ? "text-red-500 bg-[#E850501A]"
                        : "text-[#59B17A]"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="py-5 pl-5 border-r border-b text-[16px] font-medium">
                  <Button
                    onClick={() => {
                      handleUpdateSuppler(item);
                    }}
                    variant={"edit"}
                    className="w-30 cursor-pointer"
                  >
                    <Pen />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
