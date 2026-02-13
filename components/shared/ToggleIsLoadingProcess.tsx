
import  { ReactNode } from "react";
import LoadingProgress from "./LoadingProgress";

type FunctionProps = {
  children: ReactNode;
  color?: string;
  isLoading: boolean;
  size?: SimpleSizes;
};
const ToggleIsLoadingProcess = ({
  children,
  color,
  isLoading,
  size,
}: FunctionProps) => {


  if (isLoading) {
    return (
      <LoadingProgress
      
        isLoading={true}
        size={size }
      />
    );
  }
  return <>{children}</>;
};

export default ToggleIsLoadingProcess;
