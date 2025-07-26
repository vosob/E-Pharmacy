import { Modal } from "@/Components/Modal/Modal";
import { SuppliersTable } from "@/Components/SuppliersTable/SuppliersTable";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Funnel } from "lucide-react";
import type { Suppliers } from "@/types/suppliers";
import { useEffect, useState } from "react";
import { getSuppliers } from "@/api/suppliers";
import { SuppliersPagination } from "@/Components/SuppliersPagination/SuppliersPagination";

const rowsPerPage = 5;
const minPage = 1;

export const AllSuppliers = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<Suppliers[]>([]);
  const [editingSupplier, setEditingSupplier] = useState<Suppliers | null>(
    null
  );
  const [startIndex, setStartIndex] = useState(minPage);
  const [maxPage, setMaxPage] = useState<number | null>(null);

  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState<Suppliers[] | null>(null);

  const prevPageHandler = () => {
    setStartIndex((curr) => (curr - 1 >= minPage ? curr - 1 : curr));
  };

  const nextPageHandler = () => {
    setStartIndex((curr) =>
      maxPage != null && curr + 1 <= maxPage ? curr + 1 : curr
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleFilter = () => {
    const result = tableData.filter((item) =>
      item.suppliersInfo.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(result);
  };

  const handleClearFilter = () => {
    setFilterText("");
    setFilteredData(null);
  };

  const handleUpdateSuppler = (data: Suppliers) => {
    setEditingSupplier(data);
    setOpen(true);
  };

  useEffect(() => {
    getSuppliers(startIndex, rowsPerPage).then((res) => {
      setTableData(res.data);
      setMaxPage(res.totalPages);
      setFilteredData(null);
    });
  }, [startIndex]);

  const dataToDisplay = filteredData ?? tableData;

  return (
    <div>
      <div className="flex items-center px-5 pt-18.5 gap-3">
        <Input
          value={filterText}
          onChange={handleInputChange}
          className="w-[225px]"
          placeholder="User Name"
        />
        <Button onClick={handleFilter} className="w-[116px] bg-[#59B17A]">
          <Funnel />
          Filter
        </Button>
        {filteredData && (
          <Button onClick={handleClearFilter} variant="outline">
            Clear
          </Button>
        )}
        <Button
          onClick={() => {
            setEditingSupplier(null);
            setOpen(true);
          }}
          className="bg-[#59B17A] ml-auto"
        >
          Add a new supplier
        </Button>

        <Modal
          open={open}
          setOpen={setOpen}
          setTableData={setTableData}
          startIndex={startIndex}
          rowsPerPage={rowsPerPage}
          supplierToEdit={editingSupplier}
        />
      </div>

      <SuppliersTable
        handleUpdateSuppler={handleUpdateSuppler}
        tableData={dataToDisplay}
      />

      <SuppliersPagination
        prevPageHandler={prevPageHandler}
        nextPageHandler={nextPageHandler}
        disabledPrev={startIndex === minPage}
        disabledNext={maxPage != null && startIndex + 1 > maxPage}
      />
    </div>
  );
};
