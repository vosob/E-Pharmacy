import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";

import type { Suppliers } from "@/types/suppliers";
import { createSupplier, getSuppliers, updateSupplier } from "@/api/suppliers";
import { useEffect, useState } from "react";
import moment from "moment";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setTableData: (tableData: Suppliers[]) => void;
  startIndex: number;
  rowsPerPage: number;
  supplierToEdit: Suppliers | null;
};

export const Modal = ({
  open,
  setOpen,
  setTableData,
  startIndex,
  rowsPerPage,
  supplierToEdit,
}: Props) => {
  const { register, handleSubmit, reset, control } = useForm<Suppliers>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Suppliers) => {
    try {
      setLoading(true);

      if (supplierToEdit) {
        await updateSupplier(supplierToEdit.id, data);
      } else {
        await createSupplier(data);
      }

      reset();
      setOpen(false);

      const res = await getSuppliers(startIndex, rowsPerPage);
      setTableData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && supplierToEdit) {
      console.log(supplierToEdit, typeof supplierToEdit.deliveryDate);
      reset({
        suppliersInfo: supplierToEdit.suppliersInfo,
        address: supplierToEdit.address,
        company: supplierToEdit.company,
        deliveryDate: moment(supplierToEdit.deliveryDate).format("YYYY-MM-DD"),
        amount: supplierToEdit.amount,
        status: supplierToEdit.status,
      });
    }
  }, [supplierToEdit, open, reset]);

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-10">
        <DialogHeader className="mb-10">
          <DialogTitle>
            {supplierToEdit ? "Edit Supplier" : "Add a new suppliers"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <Input
              placeholder="Suppliers Info"
              type="text"
              {...register("suppliersInfo", { required: true })}
            />
            <Input
              placeholder="Address"
              type="text"
              {...register("address", { required: true })}
            />
            <Input
              placeholder="Company"
              type="text"
              {...register("company", { required: true })}
            />
            <Input
              placeholder="Delivery date"
              type="date"
              {...register("deliveryDate", { required: true })}
            />
            <Input
              placeholder="Amount"
              type="number"
              {...register("amount", { required: true, valueAsNumber: true })}
            />

            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[205px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Deactive">Deactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-[133px] mr-2 bg-[#59B17A] cursor-pointer"
            >
              {supplierToEdit ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="w-[133px] bg-[#1D1E211A] text-gray-500 cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
