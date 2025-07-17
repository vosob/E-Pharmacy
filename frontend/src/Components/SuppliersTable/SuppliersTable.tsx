import { getSuppliers } from "@/api/suppliers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import type { Suppliers } from "@/types/suppliers";
import { useEffect, useState } from "react";

export const SuppliersTable = () => {
  const [tableData, setTableData] = useState<Suppliers[]>([]);

  useEffect(() => {
    getSuppliers().then((data) => setTableData(data));
  }, []);

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
          {tableData.map((item) => (
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
                {item.status}
              </TableCell>
              <TableCell className="py-5 pl-5 border-r border-b text-[16px] font-medium">
                Button
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
