import { Suspense } from "react";

import * as PropTypes from "prop-types";
import LoadingPage from "./Loading";

const LazyLoad = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LazyLoad;
