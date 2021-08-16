import { getLayout as getSiteLayout } from "../../src/components/Layouts/SiteLayout";
import WorkSpaceTitle from "../../src/components/workspace/WorkSpaceTitle";
import {wrapper} from "../../src/redux/store";
import {getWorkspaceProject} from "../../src/redux/actions/workSpaceActions";

const Setting = () => {

    return  <div className='mainContainerBody'>
        <WorkSpaceTitle title='Workspace Name'/>
        <section className='settings-tab'>
            <div className='tab-list'>
                <span>change password</span>
                <span>change workspace name</span>
            </div>
            <div className='tab-container'>

            </div>
        </section>
    </div>
};

Setting.getLayout = getSiteLayout;

export default Setting;

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//         async ({ req, params }) => {
//             if (!req.cookies.token)
//                 return {
//                     redirect: {
//                         destination: "/",
//                         permanent: true,
//                     },
//                 };
//             const validToken = await verify(
//                 req.cookies.token,
//                 process.env.REACT_APP_SECRET_TOKEN
//             );
//             if (validToken) {
//                 await store.dispatch(getWorkspaceProject(req));
//                 return { props: { token: req.cookies.token } };
//             } else {
//                 return {
//                     redirect: {
//                         destination: "/",
//                         permanent: false,
//                     },
//                 };
//             }
//         }
// );