import { PiSparkleFill } from "react-icons/pi";

export const SparkleeLogo = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-2 text-xl align-middle transition-colors select-none text-accent">
        <PiSparkleFill />
        <h1 className="font-sans italic font-bold">sparklee!</h1>
      </div>
    </>
  );
};
