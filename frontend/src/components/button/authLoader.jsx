import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { setAuthStatus, setAuthenticating } from "@/redux/actions/miscActions";

const AuthenticatingLoader = ({ authStatus, title }) => {
  return authStatus?.success ? (
    <Button
      id="authenticated"
      className="authenticated"
      fullWidth
      variant="contained"
      color="primary"
      disabled
    >
      {authStatus.message}
    </Button>
  ) : (
    <Button
      id="authenticating"
      className="authenticating"
      variant="contained"
      fullWidth
      disabled
    >
      <span />
      <span />
      <span />
      <span />
      {title}
    </Button>
  );
};

const AuthLoader = ({ authStatus, title }) => {
  const dispatch = useDispatch();

  const handleResetAuth = () => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  };

  return authStatus && !authStatus.success ? (
    <Button
      id="error"
      onClick={handleResetAuth}
      className="error"
      fullWidth
      variant="outlined"
      color="error"
    >
      {authStatus.message + " Please try again?"}
    </Button>
  ) : (
    <Button
      id="signin"
      type="submit"
      className="submit"
      fullWidth
      variant="contained"
      color="primary"
    >
      {title}
    </Button>
  );
};

export { AuthenticatingLoader, AuthLoader };
