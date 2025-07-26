import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type { FieldPath } from "react-hook-form";
import { useEffect, useState } from "react";

type Field<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  placeholder: string;
  type?: string;
  options?: { label: string; value: string }[];
};

type Props<T extends Record<string, unknown>> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData?: T | null;
  fields: Field<T>[];
  title: string;
  onSubmit: (data: T) => Promise<void>;
};

export const ReusableModal = <T extends Record<string, unknown>>({
  open,
  setOpen,
  initialData,
  fields,
  title,
  onSubmit,
}: Props<T>) => {
  const { register, handleSubmit, reset } = useForm<T>();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data: T) => {
    try {
      setLoading(true);
      await onSubmit(data);
      reset();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && initialData) reset(initialData);
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-10">
        <DialogHeader className="mb-10">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {fields.map((field) =>
              field.options ? (
                <select
                  key={String(field.name)}
                  {...register(field.name, { required: true })}
                  className="border p-2 rounded"
                >
                  <option value="">Select...</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={String(field.name)}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  {...register(field.name, { required: true })}
                  className="border p-2 rounded"
                />
              )
            )}
          </div>
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-[133px] mr-2 bg-[#59B17A]"
            >
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                reset();
                setOpen(false);
              }}
              className="w-[133px] bg-[#1D1E211A] text-gray-500"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
