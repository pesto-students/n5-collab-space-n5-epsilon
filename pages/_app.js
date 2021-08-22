import "../styles/globals.scss";
// import 'sal.js/sal.css';

import 'sal.js/dist/sal.css';

import SiteLayout from "../src/components/layouts/SiteLayout";
import { wrapper } from "../src/redux/store";

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>);
  return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
