import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MatrixViewPage.module.css";
import { ChromePicker } from "react-color";

export const MatrixViewPage = () => {
  const createEmptyMatrixView = () => {
    const view = [];
    for (let i = 0; i < 16; i++) {
      const row = [];
      for (let j = 0; j < 16; j++) {
        row.push({ rgb: { r: 0, g: 0, b: 0 } });
      }
      view.push(row);
    }
    return view;
  };
  const { matrixId } = useParams();
  const [matrixView, setMatrixView] = useState(createEmptyMatrixView());
  const [selectedColor, setSelectedColor] = useState({ r: 255, g: 0, b: 0 });

  const handlePixelColorChange = (x, y) => {
    const updatedView = [...matrixView];
    updatedView[x][y].rgb = selectedColor;
    setMatrixView(updatedView);
  };

  //   const handleColorChange = (event) => {
  //     const { name, value } = event.target;
  //     setSelectedColor((prevState) => ({
  //       ...prevState,
  //       [name]: parseInt(value, 10),
  //     }));
  //   };

  const handleColorChange = (color) => {
    setSelectedColor(color.rgb);
  };

  const handleApplyMatrixView = () => {
    axios
      .put(`/api/matrices/${matrixId}/view`, { view: matrixView })
      .then((response) => {
        console.log("Матрица успешно обновлена:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении матрицы:", error);
      });
  };

  return (
    <div>
      <h1>Управление светодиодной матрицей</h1>
      <div className="color-picker-container">
        <ChromePicker color={selectedColor} onChange={handleColorChange} />
      </div>
      <div className={css.matrixContainer}>
        {matrixView.map((row, x) => (
          <div key={x} className={css.matrixRow}>
            {row.map((pixel, y) => (
              <div
                key={`${x}-${y}`}
                className={css.matrixPixel}
                style={{
                  backgroundColor: `rgb(${pixel.rgb.r}, ${pixel.rgb.g}, ${pixel.rgb.b})`,
                }}
                onClick={() => handlePixelColorChange(x, y)}
              />
            ))}
          </div>
        ))}
      </div>

      <button onClick={handleApplyMatrixView}>Применить</button>
    </div>
  );
};
