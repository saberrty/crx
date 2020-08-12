import React from "react";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom";
import UploadStore from "./stores"
import 'antd/dist/antd.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <Provider uploadStore={UploadStore}>
        <App />
    </Provider>,
    document.getElementById("root")
);
serviceWorker.unregister();
