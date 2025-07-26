import { createCustomer, getCustomers } from "@/api/customers";
import { ReusableModal } from "@/Components/ReusableModal/ReusableModal";
import { ReusableTable } from "@/Components/ReusableTable/ReusableTable";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import type { Customers } from "@/types/customers";
import { Funnel } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import type { FieldPath } from "react-hook-form";

type Field<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  placeholder: string;
  type?: string;
  options?: { label: string; value: string }[];
};

export const AllCustomers = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Customers[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const customers = await getCustomers();
      const normalizedCustomers = customers.map((customer) => ({
        ...customer,
        createdAt: moment(customer.createdAt).format("YYYY-MM-DD"),
      }));
      setData(normalizedCustomers);
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: Customers) => {
    try {
      await createCustomer(formData);
      await loadCustomers();
      setOpen(false);
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const formFilds: Field<Customers>[] = [
    {
      name: "name",
      placeholder: "User Name",
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
    },
    {
      name: "address",
      placeholder: "Address",
      type: "text",
    },
    {
      name: "phone",
      placeholder: "Phone",
      type: "text",
    },
  ];

  return (
    <div>
      <div className="flex items-center px-5 pt-18.5 gap-3">
        <Input
          // value={filterText}
          // onChange={handleInputChange}
          className="w-[225px]"
          placeholder="User Name"
        />
        {/* onClick={handleFilter} */}
        <Button className="w-[116px] bg-[#59B17A]">
          <Funnel />
          Filter
        </Button>

        <Button onClick={handleOpen} className="bg-[#59B17A] ml-auto">
          Add a new customers
        </Button>

        <ReusableModal
          title="Add a new customers"
          onSubmit={handleSubmit}
          open={open}
          setOpen={setOpen}
          fields={formFilds}
        />
      </div>

      <div>
        {loading ? (
          <p className="text-center p-4">Loading...</p>
        ) : (
          <ReusableTable
            title="Customers Data"
            action={"Action"}
            data={data}
            columns={[
              { key: "name", header: "User Info" },
              { key: "email", header: "Email" },
              { key: "address", header: "Address" },
              { key: "phone", header: "Phone" },
              { key: "createdAt", header: "Register date" },
            ]}
            renderActions={() => null}
          />
        )}
      </div>
    </div>
  );
};
