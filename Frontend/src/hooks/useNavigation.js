import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goTo = (path, replace = false) => {
    navigate(path, { replace });
  };

  return { goBack, goTo };
};

export default useNavigation;
