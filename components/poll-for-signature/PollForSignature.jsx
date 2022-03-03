import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { INSTRUCTION_STEPS } from "../../lib/constants";
import ContentContainer from "../content-container/ContentContainer";
import QRCode from "../qr-code/QRCode";
import Instruction from "../instruction/Instruction";
import styles from "./PollForSignature.module.scss";

const PollForSignature = ({ qrCodeParams }) => {
  const [currentInstruction, setCurrentInstruction] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentInstruction <= INSTRUCTION_STEPS.length - 1) {
        setCurrentInstruction(currentInstruction + 1);
      } else {
        setCurrentInstruction(1);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentInstruction]);

  return (
    <div className={styles.container}>
      <ContentContainer>
        <QRCode qrCodeParams={qrCodeParams} />
      </ContentContainer>

      <div className={styles.instructions}>
        <AnimatePresence>
          <Instruction
            stepNumber={currentInstruction}
            stepText={INSTRUCTION_STEPS[currentInstruction - 1]}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PollForSignature;