import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <GoogleLogin
        onSuccess={async (res: any) => {
          console.log("GOOGLE TOKEN:", res);

          const token = res.credential;

          const response = await axios.post(
            "http://localhost:5005/auth/google",
            { token }
          );

          localStorage.setItem("token", response.data.token);
        }}
        onError={() => console.log("Login failed")}
      />
    </div>
  );
};

export default Login;