import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomizedSteppers from "./widget/StepperComponent";
import ModalDescriptionComponent from "./widget/ModalDescriptionComponent";
import ModalFormComponent from "./widget/ModalFormComponent";
import ModalCompletionComponent from "./widget/ModalCompletionComponent";
import ButtonComponent from "./widget/ButtonComponent";

const ModalActivityComponent= ({ open, handleClose, step, setStep }) => {
  useEffect(() => {
    if (step === -1){
      handleClose();
    }
    if (step === 4){
      handleClose();
    }
  });

  return (
    <Modal open={open} onClose={handleClose} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
      <Box sx={{width:'60%',height:'80%'}} className="bg-white rounded-2xl p-12 flex flex-col items-center">
        <CustomizedSteppers step={step} />
        {step === 0 && <> <ModalDescriptionComponent />  <ButtonComponent setStep={setStep} prev={-1} next={1}/> </>}
        {step === 1 && <> <ModalFormComponent />  <ButtonComponent setStep={setStep} prev={0} next={2}/> </>}
        {step === 2 && <> <ModalCompletionComponent/> <ButtonComponent setStep={setStep} prev={1} next={4}/> </>}
      </Box>
    </Modal>
  );
};

export default ModalActivityComponent;