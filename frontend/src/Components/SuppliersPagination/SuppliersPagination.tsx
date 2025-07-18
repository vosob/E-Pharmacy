import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  // PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

interface Props {
  prevPageHandler: () => void;
  nextPageHandler: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
}

export const SuppliersPagination = ({
  disabledPrev,
  disabledNext,
  prevPageHandler,
  nextPageHandler,
}: Props) => {
  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem
          className={disabledPrev ? "pointer-events-none text-gray-300" : ""}
        >
          <PaginationPrevious onClick={prevPageHandler} href="#" />
        </PaginationItem>

        <PaginationItem
          className={disabledNext ? "pointer-events-none text-gray-300" : ""}
        >
          <PaginationNext onClick={nextPageHandler} href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
