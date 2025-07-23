import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { IBook } from "@/interfaces/bookInterface";
import type { IBorrow } from "@/interfaces/borrowInterface";
import type { IRTKQueryErrorResponse } from "@/interfaces/rtkQueryErrorResponse";
import { useAddBorrowingMutation } from "@/redux/api/borrowApi";
import { ChevronDownIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const BorrowBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams(); // From URL
  const { state: bookData } = useLocation() as { state: IBook };
  const [borrowBook, { isLoading, isError }] = useAddBorrowingMutation();

  if (!bookId) {
    return <p className="text-center my-10">Book is not available!</p>;
  }

  // ✅ Dates for validation
  const today = new Date();
  const minDueDate = new Date(today);
  minDueDate.setDate(today.getDate() + 1);
  const maxDueDate = new Date(today);
  maxDueDate.setMonth(today.getMonth() + 1);

  const defaultValues: IBorrow = {
    book: bookId,
    quantity: 1,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days later
  };

  const form = useForm<IBorrow>({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IBorrow> = async (data) => {
    const formattedData: IBorrow = {
      ...data,
      dueDate: new Date(data.dueDate).toISOString(),
      book: bookId as string,
    }; // Submit to backend
    try {
      const result = await borrowBook(formattedData).unwrap();
      if (result.success) {
        form.reset();
        navigate("/borrow-summary", { state: { refetch: true } });
        toast.success("Book borrowed successfully");
      } else {
        toast.error("Book is not borrowed successfully. Try Again");
      }

      if (isError) {
        toast.error("Something went wrong. Try again");
      }
    } catch (err) {
      const error = err as IRTKQueryErrorResponse;
      if (error?.error) {
        toast.error(`${error.error}`);
      } else if (error?.data?.message) {
        toast.error(`${error.data.message}.`);
      } else {
        toast.error("Something went wrong. Try again");
      }
    }
  };

  return (
    <div>
      <Dialog
        open
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            navigate(-1);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-3 text-left">
              Borrow "{bookData.title}"?
            </DialogTitle>
            <DialogDescription className="text-left text-white">
              {bookData.copies} copies available.
            </DialogDescription>
            <DialogDescription className="text-left text-xs">
              (Fill with appropriate data to borrow.)
            </DialogDescription>
          </DialogHeader>

          <div>
            {bookData?.copies ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* ✅ Hidden Book ID Field */}
                  <FormField
                    control={form.control}
                    name="book"
                    render={({ field }) => <Input type="hidden" {...field} />}
                  />

                  {/* ✅ Quantity Field with Validation */}
                  <FormField
                    control={form.control}
                    name="quantity"
                    rules={{
                      required: "Quantity is required",
                      min: { value: 1, message: "Minimum 1 book required" },
                      validate: (value) =>
                        value <= bookData.copies ||
                        `Cannot borrow more than ${bookData.copies} copies`,
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Borrowing Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your number of borrowings.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ✅ Due Date Field with Validation */}
                  <FormField
                    control={form.control}
                    name="dueDate"
                    rules={{
                      required: "Due date is required",
                      validate: (value) => {
                        const selected = new Date(value);
                        if (selected < minDueDate) {
                          return "Due date must be at least 1 day from today";
                        }
                        if (selected > maxDueDate) {
                          return "Due date cannot exceed 1 month from today";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-48 justify-between font-normal"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Pick the due date (1 day to 1 month from today).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="">
                    {isLoading ? (
                      <div className="flex justify-center">
                        <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <div className=" flex justify-start gap-5">
                        <Button
                          type="submit"
                          className="bg-lime-700 hover:bg-lime-600"
                        >
                          Borrow
                        </Button>
                        {/* <Button onClick={() => navigate(-1)}>Go Back</Button> */}
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            ) : (
              <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center">
                  <p className="text-center my-10">
                    Book is not available to borrow!
                  </p>
                  <Button variant={"outline"} onClick={() => navigate(-1)}>
                    Go Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowBook;
