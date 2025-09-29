import csw from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <ClipLoader color="#646cff" size={45} />
    </div>
  );
};

export default Loader;
