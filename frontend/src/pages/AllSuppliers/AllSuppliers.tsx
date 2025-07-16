import { Modal } from "@/Components/Modal/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Funnel } from "lucide-react";
import { useState } from "react";

export const AllSuppliers = () => {
  const [open, setOpen] = useState(false);

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

        <Modal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};
