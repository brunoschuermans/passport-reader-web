import React, {Component} from "react";
import "./App.css";
import {Route} from "react-router-dom";
import Documents from "./Documents";
import Document from "./Document";
import Login from "./Login";
import {Redirect} from "react-router";
import {AppBar, Drawer, MenuItem} from "material-ui";
import Spinner from "react-spinkit";
import AddDocument from "./AddDocument";
import {ActionDone, AlertError} from "material-ui/svg-icons/index";
import {green700, red700} from "material-ui/styles/colors";
import capitalize from "titleize";

const APP_ID = "passport-reader-server-188622.appspot.com";
const STORAGE_ROOT_URL = "https://storage.googleapis.com";

export default class App extends Component {

    state = {
        offset: 0,
        spinner: false,
    };

    componentWillMount() {
        if (this.isAuthenticated()) {
            this.setState({client: this.client()});
        }
    }

    logout() {
        localStorage.removeItem("client");
        this.setState({menuOpen: false});
        return true;
    }

    client() {
        return JSON.parse(localStorage.getItem("client"));
    }

    setClient(client) {
        localStorage.setItem("client", JSON.stringify(client));
        this.setState({client: client});
    }

    setWorkInProgress(bool) {
        window.scrollTo(0, 0);
        this.setState({spinner: bool});
    }

    setActionDone() {
        window.scrollTo(0, 0);
        this.setState({
            spinner: false,
            actionDone: true,
        });
        setTimeout(() => this.setState({actionDone: false}), 5000);
    }

    setAlterError() {
        window.scrollTo(0, 0);
        this.setState({
            spinner: false,
            alertError: true,
        });
        setTimeout(() => this.setState({alertError: false}), 5000);
    }

    isAuthenticated() {
        return localStorage.getItem("client");
    }

    goTo(url) {
        this.props.history.push(url);
        this.setState({menuOpen: false});
    }

    render() {
        return (
            <div>
                {
                    this.isAuthenticated() &&
                    <div className="no-print">
                        <AppBar
                            title={
                                this.state.client.hotel ?
                                    capitalize(this.state.client.hotel.replace("_", " ")) :
                                    capitalize(this.state.client.hotelGroup.replace("_", " "))
                            }
                            onLeftIconButtonTouchTap={() => this.setState({menuOpen: true})}
                            iconElementRight={
                                (
                                    this.state.spinner &&
                                    <Spinner name="circle" fadeIn="none"/>
                                ) ||
                                (
                                    this.state.actionDone &&
                                    <ActionDone color={green700}/>
                                ) ||
                                (
                                    this.state.alertError &&
                                    <AlertError color={red700}/>
                                ) ||
                                (
                                    null
                                )
                            }
                            iconStyleRight={{marginTop: "20px", marginRight: "10px"}}
                        />
                        <Drawer
                            docked={false}
                            width={200}
                            open={this.state.menuOpen}
                            onRequestChange={() => this.setState({menuOpen: false})}
                        >
                            <MenuItem
                                onTouchTap={() => this.goTo("/")}
                            >
                                Passports
                            </MenuItem>
                            {
                                this.state.client.hotel &&
                                <MenuItem
                                    onTouchTap={() => this.goTo("/add-document")}
                                >
                                    Add document
                                </MenuItem>
                            }
                            <MenuItem
                                onTouchTap={() => this.goTo("/logout")}
                            >
                                Logout
                            </MenuItem>
                        </Drawer>
                    </div>
                }
                <Route exact path="/" render={(route) =>
                    this.isAuthenticated() ?
                        <Documents
                            appId={APP_ID}
                            storageRootUrl={STORAGE_ROOT_URL}
                            client={this.state.client}
                            clients={this.clients}
                            setWorkInProgress={this.setWorkInProgress.bind(this)}
                            setActionDone={this.setActionDone.bind(this)}
                            setAlterError={this.setAlterError.bind(this)}
                            match={route.match}
                            history={route.history}
                            location={route.location}
                        /> :
                        <Redirect to="/login"/>
                }
                />
                <Route exact path="/add-document" render={(route) =>
                    this.isAuthenticated() ?
                        <AddDocument
                            appId={APP_ID}
                            storageRootUrl={STORAGE_ROOT_URL}
                            client={this.state.client}
                            setWorkInProgress={this.setWorkInProgress.bind(this)}
                            setActionDone={this.setActionDone.bind(this)}
                            setAlterError={this.setAlterError.bind(this)}
                            match={route.match}
                            history={route.history}
                            location={route.location}
                        /> :
                        <Redirect to="/login"/>
                }
                />
                <Route exact path="/documents/:passportKey" render={(route) =>
                    this.isAuthenticated() ?
                        <Document
                            appId={APP_ID}
                            storageRootUrl={STORAGE_ROOT_URL}
                            setWorkInProgress={this.setWorkInProgress.bind(this)}
                            setActionDone={this.setActionDone.bind(this)}
                            setAlterError={this.setAlterError.bind(this)}
                            client={this.state.client}
                            document={this.state.document}
                            match={route.match}
                            history={route.history}
                            location={route.location}
                        /> :
                        <Redirect to="/login"/>
                }
                />
                <Route exact path="/login" render={(route) =>
                    <Login
                        appId={APP_ID}
                        storageRootUrl={STORAGE_ROOT_URL}
                        setClient={this.setClient.bind(this)}
                        history={route.history}
                    />
                }
                />
                <Route exact path="/logout" render={(route) =>
                    this.logout() &&
                    <Redirect to="/login"/>
                }
                />
            </div>
        );
    }
}
