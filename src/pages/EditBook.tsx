import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IBook } from "@/interfaces/bookInterface";
import type { IRTKQueryErrorResponse } from "@/interfaces/rtkQueryErrorResponse";
import { useUpdateBookMutation } from "@/redux/api/bookApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditBook = () => {
  const navigate = useNavigate();
  const { state: bookData } = useLocation() as { state: IBook };
  const { id } = useParams();

  const [
    updateBook,
    { isLoading: isBookEditing, isError: isBookEditingError },
  ] = useUpdateBookMutation();

  // const {
  // data: bookData,
  // isLoading: isBookLoading,
  // isError: isBookLoadingError,
  // } = useGetASingleBookQuery(id as string);

  // Setup form hook first (no defaultValues here)
  const form = useForm<IBook>({
    defaultValues: bookData,
    mode: "onChange",
  });

  // Error state
  // if (isBookLoadingError) {
  //   toast.error("Something went wrong. Try again.");
  //   return (
  //     <Dialog open onOpenChange={() => navigate(-1)}>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>Please Try again.</DialogTitle>
  //           <DialogDescription>
  //             Something went wrong while loading book info.
  //           </DialogDescription>
  //         </DialogHeader>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  // Loading state
  // if (isBookLoading || !bookData?.data) {
  //   return (
  //     <Dialog open onOpenChange={() => navigate(-1)}>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>Book info is loading...</DialogTitle>
  //           <DialogDescription>
  //             <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  //           </DialogDescription>
  //         </DialogHeader>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  const onSubmit: SubmitHandler<IBook> = async (data) => {
    const modifiedBookData: IBook = {
      ...data,
      title: data.title.trim(),
      author: data.author.trim(),
      isbn: data.isbn.trim(),
      description: data.description?.trim(),
    };

    try {
      if (!id) {
        console.error("Id is missing");
        return;
      }

      const result = await updateBook({ id, data: modifiedBookData }).unwrap();
      if (result.success) {
        form.reset();
        navigate(-1);
        toast.success("Book edited Successfully");
      } else {
        toast.error("Book is not edited successfully. Try Again");
      }

      if (isBookEditingError) {
        toast.error("Something went wrong. Try again");
      }
    } catch (err) {
      const error = err as IRTKQueryErrorResponse;
      if (error?.error) {
        toast.error(`${error.error}`);
      } else if (error?.data?.message) {
        toast.error(`${error.data.message}. Try with another ISBN`);
      } else {
        toast.error("Something went wrong. Try again");
      }
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          navigate(-1);
        }
      }}
    >
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mt-3 text-left text-3xl font-bold text-zinc-200 ">
            Edit Book
          </DialogTitle>
          <DialogDescription className="text-left">Edit with appropriate data</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must be at most 100 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title :</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                rules={{
                  required: "Author is required",
                  minLength: {
                    value: 3,
                    message: "Author must be at least 3 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Author must be at most 100 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author :</FormLabel>
                    <FormControl>
                      <Input placeholder="Author" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Genre */}
              <FormField
                control={form.control}
                name="genre"
                rules={{ required: "Genre is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FICTION">Fiction</SelectItem>
                        <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                        <SelectItem value="SCIENCE">Science</SelectItem>
                        <SelectItem value="HISTORY">History</SelectItem>
                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                        <SelectItem value="FANTASY">Fantasy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{
                  maxLength: {
                    value: 500,
                    message: "Description must be under 500 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description :</FormLabel>
                    <FormControl>
                      <Input placeholder="Description (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                rules={{
                  required: "ISBN is required",
                  // pattern: {
                  //   value: /^[0-9\-]{10,17}$/,
                  //   message: "Invalid ISBN format",
                  // },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN :</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ISBN (e.g., 978-1234567890)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Copies */}
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Copies is required",
                  min: { value: 0, message: "Copies must be 0 or more" },
                  validate: (val) =>
                    Number.isInteger(val) || "Copies must be a whole number",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Copies :</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        placeholder="Available Copies"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="r">
                {isBookEditing ? (
                  <div className="flex justify-center">
                    <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="flex justify-start gap-5">
                    <Button type="submit" className="bg-lime-700 hover:bg-lime-600">Submit</Button>
                    {/* <Button onClick={() => navigate(-1)}>Go Back</Button> */}
                  </div>
                )}
              </div>
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
