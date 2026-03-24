import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login, logout } = useAuth();

  if (user) {
    return (
      <div className="app-user">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name ?? ""}
            referrerPolicy="no-referrer"
            style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }}
          />
        )}
        <span>{user.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return null;
};

export default Login;
