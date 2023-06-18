import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MatrixViewPage.module.css";
import { ChromePicker } from "react-color";

export const MatrixViewPage = () => {
  // const createEmptyMatrixView = () => {
  //   const view = [];
  //   for (let i = 0; i < 16; i++) {
  //     const row = [];
  //     for (let j = 0; j < 16; j++) {
  //       row.push({ rgb: { r: 0, g: 0, b: 0 } });
  //     }
  //     view.push(row);
  //   }
  //   return view;
  // };
  const { matrixId } = useParams();
  const [matrixView, setMatrixView] = useState([]);
  const [selectedColor, setSelectedColor] = useState({ r: 255, g: 0, b: 0 });

  useEffect(() => {
    fetchMatrixView();
  }, []);

  const fetchMatrixView = () => {
    axios
      .get(`/api/matrices/${matrixId}/view`)
      .then((response) => {
        setMatrixView(response.data.view);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных матрицы:", error);
      });
  };

  const handlePixelColorChange = (x, y) => {
    const updatedView = [...matrixView];
    updatedView[x][y].rgb = selectedColor;
    setMatrixView(updatedView);
  };

  const handlePixelContextMenu = (event, x, y) => {
    event.preventDefault();
    const updatedView = [...matrixView];
    updatedView[x][y].rgb = { r: 0, g: 0, b: 0 }; // Устанавливаем черный цвет при клике правой кнопкой мыши
    setMatrixView(updatedView);
  };

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
                onContextMenu={(event) => handlePixelContextMenu(event, x, y)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleApplyMatrixView}>Применить</button>
    </div>
  );
};
