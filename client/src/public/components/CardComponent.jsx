import { motion } from "framer-motion";
import { useState } from "react";
import ModalActivityComponent from "./modalComponent/ModalActivityComponent";
import '../../App.css';
import { useStateContext } from "../../contexts/contextProvider";
import { Navigate } from "react-router-dom";
import userConsts from "../../consts/common-consts";
import { useNavigate } from "react-router-dom";

const SquishyCard = (props) => {
  return (
    <section className="bg-white px-4 py-8">
      <div className="mx-auto w-fit">
        <Card props={props} />
      </div>
    </section>
  );
};

const Card = ({props}) => {
  const { token } = useStateContext();
  // const user = useGetCurrentUser();
  const navigate = useNavigate();
  const userLoggedIn = !!token ? true : false;
  const [open, handleOpen] = useState(false);
  const [step, setStep] = useState(0);
  const setOpen = () => {
    if (!userLoggedIn) {
      navigate("/login");
    } else {
      handleOpen(true);
      setStep(0);
    }
  }
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-96 w-80 shrink-0 overflow-hidden rounded-xl bg-indigo-500 p-8"
    >
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
          {props.category}
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block top-left font-mono text-6xl font-black leading-[1.2] custom-overline-title"
        >
          {props.activityName}

        </motion.span>
        <p className="custom-overline">
          {props.description}
        </p>
      </div>
      <button onClick={setOpen} className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
        Join Now
      </button>
      <ModalActivityComponent prop={props} open={open} handleClose={() => handleOpen(false)} step={step} setStep={setStep} setRender={props.setRender}/>
        
      <Background />
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};

export default SquishyCard;