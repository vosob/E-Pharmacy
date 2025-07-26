import { getCustomers } from "@/api/customers";
import { ReusableTable } from "@/Components/ReusableTable/ReusableTable";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import type { Customers } from "@/types/customers";
import { Funnel } from "lucide-react";
import moment from "moment";

import { useEffect, useState } from "react";

export const AllCustomers = () => {
  const [data, setData] = useState<Customers[]>([]);

  useEffect(() => {
    getCustomers().then((res) => setData(res));
  }, []);
  console.log(data);

  const normalizeDate = (date: string) => {
    return moment(date).format("YYYY-MM-DD");
  };

  data.forEach((item) => {
    item.createdAt = normalizeDate(item.createdAt);
  });

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
      </div>
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
    </div>
  );
};
