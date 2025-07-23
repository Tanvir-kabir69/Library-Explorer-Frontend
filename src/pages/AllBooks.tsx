import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/bookApi";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";
import { RiFolderReceivedFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { IRTKQueryErrorResponse } from "@/interfaces/rtkQueryErrorResponse";
import { useState } from "react";

const AllBooks = () => {
  const navigate = useNavigate();

  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const [deleteBook, { isLoading: isBookDeleting, isError }] =
    useDeleteBookMutation();

  const handleDeleteBook = async (id: string) => {
    try {
      if (!id) {
        console.error("Id is missing");
        return;
      }

      const result = await deleteBook(id).unwrap();

      if (result.success) {
        toast.success("Book Deleted Successfully");
        setOpenDialogId(null); // ✅ closes the dialog
      } else {
        toast.error("Book is not deleted successfully. Try Again");
      }

      if (isError) {
        toast.error("Something went wrong. Try again");
      }
    } catch (err) {
      const error = err as IRTKQueryErrorResponse;
      if (error?.error) {
        toast.error(`${error.error}`);
      } else if (error?.data?.message) {
        toast.error(`${error.data.message}. Please try Again`);
      } else {
        toast.error("Something went wrong. Try again");
      }
    }
  };

  const { data: booksResponse, isLoading } = useGetAllBooksQuery();

  if (isLoading) {
    return (
      <div>
        <p className="text-center my-10">Loading Books ...!</p>
      </div>
    );
  }

  if (!booksResponse?.data || booksResponse?.data?.length === 0) {
    return (
      <div>
        <p className="text-center my-10">Sorry! No Books Available ...!</p>
      </div>
    );
  }

  return (
    <div className="my-8 p-5 w-full border rounded-xl bg-neutral-900">
      <div className="mx-1 mb-3 flex items-center justify-between">
        <p className="p-0 m-0 text-3xl font-bold text-zinc-200">All Books :</p>
        <Button onClick={() => navigate("/create-book")} className="bg-lime-700 hover:bg-lime-600">Add Book</Button>
      </div>
      <div className="border rounded-sm flex justify-center bg-neutral-950">
        <Table>
          <TableCaption className="mb-5">
            <p className="">Lists of Books</p>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Author</TableHead>
              <TableHead className="text-center">Genre</TableHead>
              <TableHead className="text-center">ISBN</TableHead>
              <TableHead className="text-center">Copies</TableHead>
              <TableHead className="text-center">Avaibality</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...(booksResponse?.data || [])].reverse().map((book, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{book.title}</TableCell>
                <TableCell className="text-center">{book.author}</TableCell>
                <TableCell className="text-center">{book.genre}</TableCell>
                <TableCell className="text-center">{book.isbn}</TableCell>
                <TableCell className="text-center">{book.copies}</TableCell>
                <TableCell className="text-center">
                  {book.copies > 0 ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        navigate(`/edit-book/${book._id}`, { state: book })
                      }
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() =>
                        navigate(`/borrow/${book?._id}`, { state: book })
                      }
                    >
                      <RiFolderReceivedFill />
                    </Button>
                    <div className="DeleteSection">
                      <Dialog
                        open={openDialogId === book?._id}
                        onOpenChange={(open) =>
                          setOpenDialogId(open ? (book?._id as string) : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setOpenDialogId(book?._id as string)}
                          >
                            <MdDelete />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="mt-3 text-left leading-6">
                              Are you sure want to delete the book "{book.title}
                              " ?
                            </DialogTitle>
                            <DialogDescription className="text-left">
                              Any data and information related to this book will
                              be deleted.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex flex-row">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cancel
                              </Button>
                            </DialogClose>
                            {isBookDeleting ? (
                              <Button className="flex justify-center items-center gap-3">
                                Deleting
                                <div className="h-5 w-5 border-4 border-neutral-800 border-t-transparent rounded-full animate-spin"></div>
                              </Button>
                            ) : (
                              <Button
                                onClick={() =>
                                  handleDeleteBook(book?._id as string)
                                }
                                className="bg-lime-700 hover:bg-lime-600"
                              >
                                Delete
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Button onClick={() => navigate(`/books/${book._id}`)}>
                      <BiSolidDetail />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllBooks;
