import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  renderActions?: (item: T) => React.ReactNode;
  action?: string;
}

export const ReusableTable = <T extends { id: string }>({
  data,
  columns,
  title,
  renderActions,
  action,
}: TableProps<T>) => (
  <div className="mt-5 px-5">
    {title && (
      <h1 className="bg-[#E7F1ED] p-5 rounded-t-xl text-[18px] text-[#1D1E21] font-semibold">
        {title}
      </h1>
    )}
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={String(col.key)}
              className="text-[#1D1E2166] border-x p-5"
            >
              {col.header}
            </TableHead>
          ))}
          {renderActions && (
            <TableHead className="text-[#1D1E2166] border-r p-5">
              {action}
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                className="py-5 pl-5 border-r border-b text-[16px] font-medium"
              >
                {col.render ? col.render(item) : String(item[col.key])}
              </TableCell>
            ))}
            {renderActions && (
              <TableCell className="py-5 pl-5 border-r border-b">
                {renderActions(item)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
