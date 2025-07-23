import { NavLink } from "react-router";

const Navbar = () => {
  return (
    // <nav className="w-[80vw] mx-auto rounded-2xl sticky top-2 z-50 bg-lime-100 shadow-md">
    <nav className="h-[50px] md:h-[60px] lg:h-[60px] w-full mx-auto rounded-b-xl md:rounded-2xl sticky top-0 md:top-2 z-50 bg-white/10 backdrop-blur-sm shadow-md">
      <div className="h-full mx-auto px-4 py-0 md:py-0 flex items-end justify-between">
        <NavLink className={({isActive}) => isActive? 'text-3xl italic font-bold text-lime-400 text-center h-full flex justify-center items-center': 'text-3xl italic font-bold text-lime-600 hover:text-lime-500 text-center h-full flex justify-center items-center'} to={'/'}>lx</NavLink>
        <div className="h-full flex items-center justify-between gap-5 md:gap-8 lg:gap-16">
            <NavLink className={({isActive}) => isActive? 'text-lime-400 border-b-5 border-b-lime-500 text-center h-full flex justify-center items-center': 'text-lime-600 hover:text-lime-500 text-center h-full flex justify-center items-center'} to={'/books'}>All Books</NavLink>
            <NavLink className={({isActive}) => isActive? 'text-lime-400 border-b-5 border-b-lime-500 text-center h-full flex justify-center items-center': 'text-lime-600 hover:text-lime-500 text-center h-full flex justify-center items-center'} to={'/create-book'}>Add Book</NavLink>
            <NavLink className={({isActive}) => isActive? 'text-lime-400 border-b-5 border-b-lime-500 text-center h-full flex justify-center items-center': 'text-lime-600 hover:text-lime-500 text-center h-full flex justify-center items-center'} to={'/borrow-summary'}>Borrow Summary</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
