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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const Modal = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-10">
        <DialogHeader className="mb-10">
          <DialogTitle>Add a new suppliers</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <Input placeholder="Suppliers Info" type="text" />
          <Input placeholder="Address" type="text" />
          <Input placeholder="Company" type="text" />
          <Input placeholder="Delivery date" type="date" />
          <Input placeholder="Amount" type="number" />
          <Select>
            <SelectTrigger className="w-[205px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Active</SelectItem>
              <SelectItem value="dark">Deactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button className="w-[133px] mr-2 bg-[#59B17A] cursor-pointer">
            Add
          </Button>
          <Button className="w-[133px]  bg-[#1D1E211A] text-gray-500 cursor-pointer">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
