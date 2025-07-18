import { Modal } from "@/Components/Modal/Modal";
import { SuppliersTable } from "@/Components/SuppliersTable/SuppliersTable";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Funnel } from "lucide-react";
import type { Suppliers } from "@/types/suppliers";
import { useEffect, useState } from "react";
import { getSuppliersPaginated } from "@/api/suppliers";
import { SuppliersPagination } from "@/Components/SuppliersPagination/SuppliersPagination";

const rowsPerPage = 5;
const minPage = 1;

export const AllSuppliers = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<Suppliers[]>([]);

  const [startIndex, setStartIndex] = useState(minPage);
  const [maxPage, setMaxPage] = useState<number | null>(null);

  const prevPageHandler = () => {
    setStartIndex((curr) => (curr - 1 >= minPage ? curr - 1 : curr));
  };
  const nextPageHandler = () => {
    setStartIndex((curr) =>
      maxPage != null && curr + 1 <= maxPage ? curr + 1 : curr
    );
  };

  useEffect(() => {
    getSuppliersPaginated(startIndex, rowsPerPage).then((res) => {
      setTableData(res.data);
      setMaxPage(res.totalPages);
    });
  }, [startIndex]);

  return (
    <div>
      <div className="flex items-center px-5 pt-18.5">
        <Input className="w-[225px] mr-3" placeholder="User Name" />
        <Button className="w-[116px] bg-[#59B17A] cursor-pointer">
          <Funnel />
          Filter
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#59B17A] ml-auto cursor-pointer"
        >
          Add a new supplier
        </Button>

        <Modal open={open} setOpen={setOpen} setTableData={setTableData} />
      </div>
      <SuppliersTable tableData={tableData} />
      <SuppliersPagination
        prevPageHandler={prevPageHandler}
        nextPageHandler={nextPageHandler}
        disabledPrev={startIndex === minPage}
        disabledNext={maxPage != null && startIndex + 1 > maxPage}
      />
    </div>
  );
};
