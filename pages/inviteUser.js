import Head from "next/head";
import Image from "next/image";
import { getLayout as getEmptyLayout } from "../src/components/layouts/EmptyLayout";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { addUser } from "../src/redux/actions/workSpaceActions";
import { wrapper } from "../src/redux/store";
import { verify } from "jsonwebtoken";
export default function inviteUser() {
  return (
    <div className={styles.container}>
      <h1>CollabSpace</h1>
      <Link href="/workspace">
        <a> Let&apos;s Go</a>
      </Link>
    </div>
  );
}

inviteUser.getLayout = getEmptyLayout;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const { userEmail, projectId } = req.__NEXT_INIT_QUERY;
      if (!req.cookies.token)
        return {
          redirect: {
            destination: `/auth?redirect=true&url=/inviteUser&userEmail=${userEmail}&projectId=${projectId}`,
            permanent: true,
          },
        };
      const validToken = await verify(
        req.cookies.token,
        process.env.REACT_APP_SECRET_TOKEN
      );
      if (validToken) {
        const inviteUserInfo = {
          userEmail,
          projectId,
        };
        await store.dispatch(addUser(inviteUserInfo));
        return {
          redirect: {
            destination: "/workspace",
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: `/auth?redirect=true&url=/inviteUser&userId=${userEmail}&projectId=${projectId}`,
            permanent: false,
          },
        };
      }
    }
);
