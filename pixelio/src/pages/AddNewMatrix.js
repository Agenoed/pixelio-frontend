import { Helmet } from "react-helmet";
import { AddMatrixPage } from "../components/NewMatrix/NewMatrix";
export default function NewMatrices() {
  return (
    <div>
      <Helmet>
        <title>Add new matrices</title>
      </Helmet>
      <AddMatrixPage />
    </div>
  );
}
