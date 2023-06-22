import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import matrixIcon from "../../images/matrixIcon.png";

export const LEDMatrixPage = () => {
  const navigate = useNavigate();
  const [matrices, setMatrices] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    // Запрос к API для получения данных о матрицах пользователя
    axios
      .get(`/api/matrices?ownerUserId=${user.id}`)
      .then((response) => {
        setMatrices(response.data.list);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о матрицах:", error);
      });
  }, [user.id]);

  const handleAddMatrix = () => {
    navigate("/add-matrix");
  };

  const handleDeleteMatrix = (matrixId) => {
    // Запрос к API для удаления матрицы по ее идентификатору
    axios
      .delete(`/api/matrices/${matrixId}`)
      .then((response) => {
        // Успешное удаление матрицы
        console.log("Матрица успешно удалена");
        // Обновляем список матриц после удаления
        setMatrices(matrices.filter((matrix) => matrix.id !== matrixId));
      })
      .catch((error) => {
        console.error("Ошибка при удалении матрицы:", error);
      });
  };

  return (
    <div>
      <h1>User LED Matrix</h1>
      {matrices.map((matrix) => (
        <div key={matrix.id}>
          <Link to={`/matrix/${matrix.id}`}>
            <img width="150px" src={matrixIcon} alt="Матрица" />
          </Link>
          <p>Name: {matrix.name}</p>
          <p>ID: {matrix.id}</p>
          <button onClick={() => handleDeleteMatrix(matrix.id)}>
            Delete matrix
          </button>
        </div>
      ))}
      <button onClick={handleAddMatrix}>Add new matrix</button>
    </div>
  );
};
