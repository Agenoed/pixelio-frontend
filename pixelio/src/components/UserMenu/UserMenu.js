import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/useAuth";
import css from "./UserMenu.module.css";
import Button from "@mui/material/Button";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { userId } = useAuth();

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {userId}</p>
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
