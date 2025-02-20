
import * as React from "react";
import { useState } from "react";
import { useLoginMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ user: username, accessToken: userData.accessToken }));
      navigate("/");
    } catch (err) {
      console.error("Ошибка входа", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Войти</h1>
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
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>Войти</button>
        </form>
        <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        {error && <p style={{ color: "red" }}>Ошибка: {"data" in error ? (error as any).data.message : "Неизвестная ошибка"}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
