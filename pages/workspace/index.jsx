import MainContainer from "../../src/components/workspace/MainContainer";
import { getWorkspaceProject } from "../../src/redux/actions/workSpaceActions";
import { wrapper } from "../../src/redux/store";
import { verify } from "jsonwebtoken";
import TourGuide from "../../src/components/TourGuide";
import Spinner from "../../src/components/common/contentLoader/spinningCircleLoader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const Workspace = () => {
  const loading = useSelector((state) => state.WorkSpaceReducer.loading);
  const dispatch = useDispatch();

  const toggleLoading = (setLoadingTo) => {
    dispatch({ type: "TOGGLE_LOADING", payload: { loading: setLoadingTo } });
  };

  return (
    <>
      <MainContainer toggleLoading={toggleLoading} />
      <TourGuide />
      <ToastContainer autoClose={2000} />
      {loading ? <Spinner /> : null}
    </>
  );
};

export default Workspace;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      if (!req.cookies.token)
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
      const validToken = await verify(
        req.cookies.token,
        process.env.REACT_APP_SECRET_TOKEN
      );
      if (validToken) {
        await store.dispatch(getWorkspaceProject(req));
        return { props: { token: req.cookies.token } };
      } else {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
);
