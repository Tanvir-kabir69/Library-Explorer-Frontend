import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetASingleBookQuery } from "@/redux/api/bookApi";
import { useNavigate, useParams } from "react-router";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookResponseData } = useGetASingleBookQuery(id as string);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          navigate(-1); // 👈 go back when dialog is closed
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-3 text-left">
            {bookResponseData?.data?.title}
          </DialogTitle>
          <p className="text-left text-xs text-zinc-400">
            <span className="text-zinc-50">By, </span>
            {bookResponseData?.data?.author}
          </p>
          <DialogDescription className="text-left mt-3">
            <span className="text-white">Description : </span>{" "}
            {bookResponseData?.data?.description}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-neutral-800  p-4 mt-4 rounded-xl flex text-xs text-zinc-400 gap-4">
          {/* Column 1: Labels */}
          <div className="flex flex-col items-start ">
            <span>Genre</span>
            <span>ISBN</span>
            <span>Available copies</span>
            <span>Availability</span>
          </div>
          {/* Column 2: ':' */}
          <div className="flex flex-col items-start ">
            <span>:</span>
            <span>:</span>
            <span>:</span>
            <span>:</span>
          </div>
          {/* Column 3: Values */}
          <div className="flex flex-col items-start">
            <span>{bookResponseData?.data?.genre}</span>
            <span>{bookResponseData?.data?.isbn}</span>
            <span>{bookResponseData?.data?.copies}</span>
            <span>
              {bookResponseData?.data?.copies &&
              bookResponseData?.data?.copies > 0
                ? "Available"
                : "Not Available"}
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs text-zinc-400 text-center">
          Details of the book "{bookResponseData?.data?.title}"
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetails;
