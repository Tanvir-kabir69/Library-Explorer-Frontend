import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBooksQuery } from "@/redux/api/bookApi";
import { useGetBorrowInfoQuery } from "@/redux/api/borrowApi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const BorrowSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { refetch: boolean } };

  const { refetch: refetchAllBooks } = useGetAllBooksQuery();
  useEffect(() => {
    if (state?.refetch) {
      refetchAllBooks();
    }
  }, [state?.refetch, refetchAllBooks]);

  const {
    data: borrowSummaryResponse,
    isLoading,
    isError,
  } = useGetBorrowInfoQuery();
  let totalQuantity: number = 0;

  if (isLoading) {
    return (
      <div>
        <p className="text-center my-10">Loading Borrowing Summary !</p>
      </div>
    );
  }

  if (borrowSummaryResponse?.success === false || isError) {
    return (
      <div>
        <p className="text-center my-10">
          Something went wrong. Refresh the page or try again later.
        </p>
      </div>
    );
  }

  if (
    !borrowSummaryResponse?.data ||
    borrowSummaryResponse?.data.length === 0
  ) {
    return (
      <div>
        <p className="text-center my-10">No Borrowings happended yet ...!</p>
      </div>
    );
  }

  borrowSummaryResponse?.data.map(
    (borrowing) => (totalQuantity += borrowing.totalQuantity)
  );

  return (
    <div className="my-8 p-5 w-full border rounded-xl bg-neutral-900">
      <div className="mx-1 mb-3 flex items-center justify-between">
        <p className="p-0 m-0 text-3xl font-bold text-zinc-200">
          Borrowing Summary :
        </p>
        <Button onClick={() => navigate("/books")} className="bg-lime-700 hover:bg-lime-600">Borrow A Book</Button>
      </div>
      <div className="border rounded-sm flex justify-center bg-neutral-950">
        <Table>
          <TableCaption className="mb-5">
            A List of Borrow Summary.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-center">ISBN</TableHead>
              <TableHead className="text-center">Total Borrowing</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowSummaryResponse?.data.map((borrowing, index) => (
              <TableRow key={index + 1}>
                <TableCell className="text-left">
                  {borrowing.book.title}
                </TableCell>
                <TableCell className="text-center">
                  {borrowing.book.isbn}
                </TableCell>
                <TableCell className="text-center">
                  {borrowing.totalQuantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="border-bottom bg-neutral-950">
              <TableCell className="text-left" colSpan={2}>
                Total borrowings
              </TableCell>
              <TableCell className="text-center">{totalQuantity}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default BorrowSummary;
