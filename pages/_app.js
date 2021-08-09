import "../styles/globals.scss";
import SiteLayout from "../src/components/Layouts/SiteLayout";
import { wrapper } from "../src/redux/store";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <SiteLayout children={page} />);
  return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
