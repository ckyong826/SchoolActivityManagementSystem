import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CustomizedSteppers from "./widget/useStepper";
import ModalDescriptionComponent from "./widget/ModalDescriptionComponent";
import ModalFormComponent from "./widget/ModalFormComponent";
import ModalCompletionComponent from "./widget/ModalCompletionComponent";
import ButtonComponent from "./widget/useButton";
import Notification from "./widget/useNotification";

const ModalActivityComponent= ({ open, handleClose, step, setStep, setRender }) => {

  useEffect(() => {
    if (step === -1){
      handleClose();
    }
    if (step === 3){
      setStep(0);
      handleClose();
      setRender(true);
      setTimeout(() => {
        setRender(false);
      }, 3000);
    }
  });

  return (
    <>
    <Modal open={open} onClose={handleClose} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
      <Box sx={{width:{xs:'100%',md:'60%'},height:'80%'}} className="bg-white rounded-2xl p-12 max-md:p-8 flex flex-col items-center">
        <CustomizedSteppers step={step} />
        {step === 0 && <> <ModalDescriptionComponent />  <ButtonComponent setStep={setStep} prev={-1} next={1}/> </>}
        {step === 1 && <> <ModalFormComponent step={step} setStep={setStep} />  </>}
        {step === 2 && <ModalCompletionComponent step = {step} setStep={setStep}/> }
      </Box>
    </Modal>
    
    </>
  );
};

export default ModalActivityComponent;