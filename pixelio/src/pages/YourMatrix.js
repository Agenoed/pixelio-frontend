import { Helmet } from "react-helmet";
import { LEDMatrixPage } from "../components/MatrixList/MatrixList";
export default function MatrixPage() {
  return (
    <div>
      <Helmet>
        <title>Your Matrices</title>
      </Helmet>
      <LEDMatrixPage />
    </div>
  );
}
