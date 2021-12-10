import { useStateContext } from "../../../components/HBOProvider";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMounted } from "../../UI/Hooks/UseMounted";
import ls from "local-storage";

const Login = () => {
  const globalState = useStateContext();
  const router = useRouter();
  const [loadingUsers, setLoadingUsers] = useState(false);
  let users = ls("users") !== null ? ls("users") : [];
  let { hasMounted } = useMounted();
  useEffect(() => {
    if (users < 1) {
      setLoadingUsers(false);
    }
  }, []);

  

  const selectUser = (id) => {
    ls("activeUID", id);
    router.push("/");
  };

  const showUsers = () => {
    if (!loadingUsers) {
      return users.map((user) => (
        <div onClick={() => selectUser(user.id)} key={user.id} className="login-user__user-box">
          <img
            className="login-user__user-img"
            src="https://uifaces.co/our-content/donated/vIqzOHXj.jpg"
          />
          <div className="login-user__user-name">{user.user}</div>
        </div>
      ));
    }
  };

  const createUser = () => {
    router.push("/");
  };

  return (
    <div className="login-user">
      <div className="login-user__top">
        <div className="login-user__logo" />
        <span className="login-user__title">Who Is Watching?</span>
      </div>

      <div className="login-user__form">{hasMounted ? showUsers() : ""}</div>
      <div className="login-user__buttons">
        <button className="login-user__adult" onClick={createUser}>
          Create User
        </button>
      </div>
    </div>
  );
};

export default Login;
