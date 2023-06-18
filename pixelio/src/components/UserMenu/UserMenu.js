import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/useAuth";
import css from "./UserMenu.module.css";
import Button from "@mui/material/Button";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.email}</p>
      <Button
        variant="outlined"
        size="small"
        type="button"
        onClick={() => dispatch(logOut())}
        sx={{
          textTransform: "none",
        }}
      >
        Logout
      </Button>
    </div>
  );
};
