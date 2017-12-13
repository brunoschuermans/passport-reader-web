import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import createBrowserHistory from "history/createBrowserHistory";
import {Router} from "react-router";

injectTapEventPlugin();

const history = createBrowserHistory();

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={history}>
            <App history={history}/>
        </Router>
    </MuiThemeProvider>
    , document.getElementById('root'));
// registerServiceWorker();
