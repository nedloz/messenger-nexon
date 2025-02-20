import React, { useState } from "react";
import { useRegisterMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    try {
      await register({ username, email, password }).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Ошибка регистрации", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Электронная почта</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Подтвердите пароль</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            Зарегистрироваться
          </button>
        </form>
        <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
        {error && <p style={{ color: "red" }}>Ошибка: {"data" in error ? (error as any).data.message : "Неизвестная ошибка"}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
