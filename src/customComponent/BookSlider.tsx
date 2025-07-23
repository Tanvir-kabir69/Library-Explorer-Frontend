import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaEdit } from "react-icons/fa";
import { RiFolderReceivedFill } from "react-icons/ri";
import { BiSolidDetail } from "react-icons/bi";
import { useGetAllBooksQuery } from "@/redux/api/bookApi";
import { useNavigate } from "react-router";
import { useRef } from "react";

const BookSlider = () => {
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null); // ✅ for accessing swiper instance
  const { data: booksResponseData } = useGetAllBooksQuery();

  if (!booksResponseData?.data || booksResponseData.data.length === 0) {
    return null;
  }

  return (
    <div
      className="w-full mx-auto"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()} // ✅ stop autoplay on hover
      onMouseLeave={() => swiperRef.current?.autoplay?.start()} // ✅ resume autoplay on leave
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // ✅ store swiper instance
        }}
        autoplay={{
          delay: 3000, // ✅ 3 seconds per slide
          disableOnInteraction: false, // ✅ keeps autoplay even after user interacts
        }}
        loop={true}
        //   navigation
        //   pagination={{ clickable: true }}
        //   slidesPerView={4.5} // Show  slides fully, center logic will balance the view
        // slidesPerView="auto" // ✅ auto number of slides per view
        centeredSlides={false} // Center the active slide
        spaceBetween={30} // Consistent spacing      // Add spacing to show side slides partially
        // ✅ THE KEY TO OVERCOMING THE SMALL SCREEN DEFAULT
        breakpoints={{
          // For screens smaller than 640px (e.g., mobile portrait)
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
          },
          240: {
            slidesPerView: 1.25,
            spaceBetween: 20,
            centeredSlides: false,
          },
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: false,
          },
          380: {
            slidesPerView: 1.75,
            spaceBetween: 20,
            centeredSlides: false,
          },
          440: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
          },
          500: {
            slidesPerView: 2.25,
            spaceBetween: 20,
            centeredSlides: false,
          },
          560: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          620: {
            slidesPerView: 2.75,
            spaceBetween: 20,
          },
          680: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          740: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
        }}
        className="w-full rounded-lg shadow-lg"
      >
        {/* {[...Array(12)].map((_, index) => ( */}
        {booksResponseData?.data?.slice(0,11).map((book, index) => (
          <SwiperSlide
            key={index}
            // className="border"
            className="w-auto md:!w-[200px] lg:!w-[200px]" // ✅ control slide width responsively    //   ! in Tailwind CSS (like !w-[200px]) means: "Force this utility class to override any previous conflicting styles."
          >
            <div className="h-[250px] rounded-xl p-3 bg-lime-900/30 flex flex-col justify-between">
              <div>
                <p className="font-bold text-lime-700">"{book.title}"</p>
                <p className="text-xs text-zinc-400">By- {book.author}</p>
              </div>

              <div className="">
                <p className="mb-5 text-sm text-zinc-400 line-clamp-4">
                  <span className="font-semibold text-zinc-400">About: </span>
                  {book.description ? book.description : "...Not available"}
                </p>
              </div>

              <div className="border rounded-md py-2 border-lime-900 flex justify-center gap-5">
                <FaEdit
                  onClick={() =>
                    navigate(`/edit-book/${book._id}`, { state: book })
                  }
                  className="text-xl text-lime-900 hover:text-lime-600"
                />
                <RiFolderReceivedFill
                  onClick={() =>
                    navigate(`/borrow/${book?._id}`, { state: book })
                  }
                  className="text-xl text-lime-900 hover:text-lime-600"
                />
                <BiSolidDetail
                  onClick={() => navigate(`/books/${book._id}#`)}
                  className="text-xl text-lime-900 hover:text-lime-600"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookSlider;
