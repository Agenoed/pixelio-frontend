import { Helmet } from "react-helmet";
import { MatrixViewPage } from "../components/MatrixViewPage/MatrixViewPage";
export default function MatrixPage() {
  return (
    <div>
      <Helmet>
        <title>Matrix Edit</title>
      </Helmet>
      <MatrixViewPage />
    </div>
  );
}
