"use client";
import { useState } from "react";
import { description } from "@/constants/homePageDescription";
import TypewriterParagraph from "@/customComponent/TypewriterParagraph";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import BookSlider from "@/customComponent/BookSlider";

const Home = () => {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  return (
    <div className="h-full w-full p-3 md:p-0 flex-1">
      {/* Two div group */}
      <div className="mt-3 flex flex-col md:flex-row justify-between items- gap-10 md:gap-5 lg:gap-10">
        {/* first div  */}
        <div className="h-full w-full bg-neutral-900 rounded-xl p-3">
          <div className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-lime-950 bg-clip-text text-transparent">
            <TypewriterParagraph onDone={() => setDone(true)} />
          </div>
          {done && (
            <motion.div
              className="mt-4 p-3 rounded-xl bg-lime-900/30 text-sm text-zinc-400 leading-5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {description}
              <div className="mt-3 flex justify-end">
                <Button
                  onClick={() => navigate("/books")}
                  className="bg-lime-800 hover:bg-lime-600"
                >
                  Explore
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* second div  */}
        <div>
          <motion.div
            className="w-full md:w-60 rounded-xl p-3 bg-lime-900/30"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-bold text-lime-700">
              Support the Library Explorer — Help Us Grow Knowledge and Access
              for All.
            </p>
            <p className="mb-5 text-sm text-zinc-400">
              Your contribution helps us expand the library and empower more
              explorers. Donate here. Any amout is appriciated.
            </p>
            <div className=" w-auto rounded-md flex flex-row md:flex-row lg:flex-row gap-3">
              <Input placeholder="Amount"></Input>
              <Button
                onClick={() => toast.success("Donstion successful")}
                className="bg-lime-800 hover:bg-lime-600"
              >
                Donate
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* slider div  */}
      <div className="bg-neutral-900 mt-5 rounded-xl p-3 ">
        <div className="mb-5 flex justify-between items-center">
          <p className="text-3xl font-bold  bg-gradient-to-r from-lime-400 to-lime-950 bg-clip-text text-transparent">
            Popular Now :
          </p>
          <Button
            onClick={() => navigate("/books")}
            className="bg-lime-800 hover:bg-lime-600"
          >
            Explore
          </Button>
        </div>
        <BookSlider />
      </div>
    </div>
  );
};

export default Home;
