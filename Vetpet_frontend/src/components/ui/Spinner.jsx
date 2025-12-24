import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Spinner = ({ loading, color = "#000", size = 40 }) => {
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
