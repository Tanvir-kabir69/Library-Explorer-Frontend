import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IBook } from "@/interfaces/bookInterface";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/redux/api/bookApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { IRTKQueryErrorResponse } from "@/interfaces/rtkQueryErrorResponse";

const defaultValues: IBook = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  description: "",
  copies: 0,
  available: false,
};

const AddBooks = () => {
  const navigate = useNavigate();

  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const form = useForm<IBook>({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IBook> = async (data) => {
    const modifiedBookData: IBook = {
      ...data,
      title: data.title.trim(),
      author: data.author.trim(),
      isbn: data.isbn.trim(),
      description: data.description?.trim(),
    };

    try {
      const result = await addBook(modifiedBookData).unwrap();
      if (result.success === true) {
        form.reset();
        navigate(`/books`);
        toast.success("Book Added Successfully");
        return;
      }
      if (result.success === false) {
        toast.error("Book is not Added. Try Again");
        return;
      }
      if (isError) {
        // have to handel error and toasting, according to ErrorEvent
        toast.error("Something went wrong. Try again");
        return;
      }
    } catch (err) {
      console.log(err);
      const error = err as IRTKQueryErrorResponse;
      if (error?.error) {
        toast.error(`${error.error}`);
        return;
      }
      if (error?.data?.message) {
        toast.error(`${error.data.message}. Try with another ISBN`);
        return;
      }
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-sm border-3 rounded-xl p-5 flex flex-col">
        <p className="mb-5 text-3xl font-bold text-zinc-200">Add a Book</p>
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
              <div className="flex justify-center">
                {isLoading ? (
                  <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <div className="flex justify-center gap-5">
                    <Button onClick={() => navigate(-1)} variant={"outline"}>Go Back</Button>
                    <Button type="submit" className="bg-lime-700 hover:bg-lime-600">Submit</Button>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
