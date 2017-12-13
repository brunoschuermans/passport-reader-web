import React, {Component} from "react";
import {Card, CardText, CardTitle} from "material-ui/Card";
import {RaisedButton, TextField} from "material-ui";

export default class Login extends Component {

    state = {};

    login() {
        fetch("https://" + this.props.appId + "/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password,
            }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                this.props.setClient(responseJson);
                this.props.history.push("/");
            })
            .catch(error => this.setState({errorMessage: "Invalid credentials"}));
    }

    render() {
        return (
            <div>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <div style={{
                        height: "200px",
                        width: "90%",
                        backgroundImage: "url('/logo.png')",
                        backgroundPosition: "center",
                        backgroundSize: "auto 60%",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    </div>
                </div>
                <Card>
                    <CardTitle
                        title="Please login:"
                    />
                    <CardText>
                        <span style={{width: "100%", color: "red"}}>{this.state.errorMessage}</span>
                        <TextField
                            hintText="User"
                            value={this.state.userName}
                            fullWidth={true}
                            onChange={(event) => this.setState({userName: event.target.value})}
                        />
                        <TextField
                            hintText="Password"
                            type="password"
                            value={this.state.password}
                            fullWidth={true}
                            onChange={(event) => this.setState({password: event.target.value})}
                        />
                        <RaisedButton
                            primary={true}
                            label="Login"
                            fullWidth={true}
                            onClick={() => this.login()}
                        />
                    </CardText>
                </Card>
            </div>
        );
    }
}
