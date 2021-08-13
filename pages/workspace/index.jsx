import MainContainer from "../../src/components/workspace/MainContainer";
import { getWorkspaceProject } from "../../src/redux/actions/workSpaceActions";
import { wrapper } from "../../src/redux/store";
import { verify } from "jsonwebtoken";
import Styles from "../../styles/mainContainer.module.scss";

const Workspace = () => {
  return (
    <div className={Styles.mainContainer}>
      <MainContainer />
    </div>
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
