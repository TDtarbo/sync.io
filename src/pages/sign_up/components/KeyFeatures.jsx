import Feature from "./Feature";
import { motion } from "framer-motion";

const features = [
  "All-in-one project dashboard – Everything you need in one place",
  "Real-time progress tracking – Keep projects on schedule effortlessly",
  "Instant notifications – Stay updated with every change",
  "Seamless client collaboration – Communicate without the chaos",
];

const KeyFeatures = () => {
  return (
    <motion.div
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-start w-[50%] px-20 max-xl:px-5 bg-indigo-600 origin-right max-xl:mt-16 max-xl:w-[100%] max-xl:py-16 max-xl:items-center"
    >
      <motion.img
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.5 }}
        className="max-xl:w-[30%]"
        src="/logo/logo.svg"
        alt=""
      />
      <motion.h2
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.6 }}
        className="text-2xl text-white font-bold mt-5"
      >
        Project management made simple.
      </motion.h2>

      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.7 }}
        className="mt-16 flex flex-col items-start"
      >
        {features.map((feature, index) => {
          return <Feature key={index} feature={feature} index={index} />;
        })}
      </motion.div>
    </motion.div>
  );
};

export default KeyFeatures;
