import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export const AddMatrixPage = () => {
  const [name, setName] = useState("");
  const [publicId, setPublicId] = useState("");
  const { user } = useAuth();
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePublicIdChange = (event) => {
    setPublicId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const matrixData = {
      name: name,
      publicId: publicId,
      ownerUserId: user.id,
    };

    axios
      .post("/api/matrices", matrixData)
      .then((response) => {
        console.log("Матрица успешно добавлена:", response.data);
        // Дополнительная логика или перенаправление пользователя
      })
      .catch((error) => {
        console.error("Ошибка при добавлении матрицы:", error);
      });
  };

  return (
    <div>
      <h1>Добавить новую матрицу</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Имя матрицы:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          ID матрицы:
          <input type="text" value={publicId} onChange={handlePublicIdChange} />
        </label>
        <br />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};
