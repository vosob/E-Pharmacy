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
import { createSupplier, getSuppliers } from "@/api/suppliers";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setTableData: (tableData: Suppliers[]) => void;
};

export const Modal = ({ open, setOpen, setTableData }: Props) => {
  const { register, handleSubmit, reset, control } = useForm<Suppliers>();

  const onSubmit = async (data: Suppliers) => {
    try {
      await createSupplier(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      getSuppliers().then((data) => setTableData(data));
    }
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-10">
        <DialogHeader className="mb-10">
          <DialogTitle>Add a new suppliers</DialogTitle>
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
              className="w-[133px] mr-2 bg-[#59B17A] cursor-pointer"
            >
              Add
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
