import React, {Component} from "react";
import {Card, CardText} from "material-ui/Card";
import {List, ListItem} from "material-ui/List";
import ActionDeleteForever from "material-ui/svg-icons/action/delete-forever";
import IconButton from "material-ui/IconButton";
import Avatar from "material-ui/Avatar";
import ActionCreditCard from "material-ui/svg-icons/action/credit-card";
import moment from "moment";
import {RaisedButton, TextField} from "material-ui";
import capitalize from "titleize";

export default class Documents extends Component {

    state = {
        query: "",
    };

    componentWillMount() {
        this.fetchParamsThenDocuments(this.props.location.search);
    }

    fetchParamsThenDocuments(searchQuery) {
        let params = this.fetchQueryParams(searchQuery);
        this.fetchDocuments(params.query, params.offset);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.search !== nextProps.location.search) {
            this.fetchParamsThenDocuments(nextProps.location.search);
        }
    }

    fetchQueryParams(queryString) {
        const queryParams = new URLSearchParams(queryString);

        const query = queryParams.get("q") ? queryParams.get("q") : "";
        const offset = queryParams.get("o") ? parseInt(queryParams.get("o")) : 0;

        this.setState({
            query: query,
            offset: offset,
        });

        return {
            query: query,
            offset: offset,
        };
    }

    fetchDocuments(query, offset) {
        this.props.setWorkInProgress(true);
        this.setState({passports: undefined});

        fetch("https://"
            + this.props.appId
            + "?hotelGroup=" + this.props.client.hotelGroup
            + "&hotel=" + (this.props.client.hotel ? this.props.client.hotel : "")
            + "&q=" + query + "&o=" + offset
            , {
                method: 'GET'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                this.setState({
                    passports: responseJson,
                });
                this.props.setWorkInProgress(false);
            })
            .catch(error => {
                console.error(error);
                this.props.setAlterError();
            });
    }

    removeDocument(passportKey) {
        this.props.setWorkInProgress(true);

        fetch("https://" + this.props.appId + "/" + passportKey, {method: 'DELETE'})
            .then((response) => {
                if (response.ok) {
                    this.fetchParamsThenDocuments(this.props.location.search);
                    this.props.setActionDone();
                } else {
                    console.error(response.statusText);
                    this.props.setAlterError();
                }
            });
    }

    leftAvatar(result) {
        return (result.fields.find(field => field.name === "documentType").atom === "P")
            ? <Avatar
                src={this.props.storageRootUrl + "/" + this.props.appId + "/" + result.fields.find(field => field.name === "hotel").atom + "/" + result.id + "/head.jpg"}/>
            : <ActionCreditCard/>;
    }

    render() {
        return (
            <div>
                <Card>
                    <CardText>
                        <TextField
                            id="search"
                            value={this.state.query}
                            fullWidth={true}
                            onChange={(event) => this.setState({query: event.target.value})}
                        />
                        <RaisedButton
                            primary={true}
                            label="Search"
                            fullWidth={true}
                            onClick={() => this.props.history.push("/?q=" + this.state.query + "&r=" + Math.random())}
                        />
                        {
                            this.state.passports &&
                            <List>
                                {
                                    this.state.passports.results
                                        .map((result, index) =>
                                            <ListItem
                                                key={index}
                                                leftAvatar={this.leftAvatar(result)}
                                                primaryText={
                                                    <div>
                                                        {
                                                            result.fields.find(field => field.name === "firstName").text
                                                            + " "
                                                            + result.fields.find(field => field.name === "lastName").text
                                                        }
                                                        <div>
                                                            <small>
                                                                {
                                                                    !this.props.client.hotel &&
                                                                    capitalize(result.fields.find(field => field.name === "hotel").atom.replace("_", " "))
                                                                }
                                                            </small>
                                                        </div>
                                                        <div>
                                                            <small>
                                                                {
                                                                    moment(parseInt(result.fields.find(field => field.name === "timestamp").atom)).format("YYYY-MM-DD HH:mm")
                                                                }
                                                            </small>
                                                        </div>
                                                        <div>
                                                            <small>
                                                                {
                                                                    result.fields.find(field => field.name === "room").atom ?
                                                                        ("Room " + result.fields.find(field => field.name === "room").atom) :
                                                                        <span style={{color: "red"}}>Missing room</span>
                                                                }
                                                            </small>
                                                        </div>
                                                    </div>
                                                }
                                                secondaryText={
                                                    <div>
                                                        <div>
                                                            {
                                                                result.fields.find(field => field.name === "country").atom
                                                                + " - "
                                                                + result.fields.find(field => field.name === "documentNumber").atom
                                                                + " ("
                                                                + result.fields.find(field => field.name === "sex").atom
                                                                + ")"
                                                            }
                                                        </div>
                                                        <div>
                                                            {result.fields.find(field => field.name === "birthDate").atom}
                                                        </div>
                                                    </div>
                                                }
                                                secondaryTextLines={2}
                                                onTouchTap={(e) => {
                                                    e.preventDefault();
                                                    this.props.history.push("/documents/" + result.id);
                                                }}
                                                rightIconButton={
                                                    this.props.client.hotel &&
                                                    <IconButton
                                                        onTouchTap={(e) => {
                                                            e.preventDefault();
                                                            this.removeDocument(result.id);
                                                        }}
                                                    >
                                                        <ActionDeleteForever/>
                                                    </IconButton>
                                                }
                                            />
                                        )
                                }
                            </List>
                        }
                        {
                            this.state.passports &&
                            (this.state.passports.numberFound > 10) &&
                            <div>
                                <RaisedButton
                                    style={{
                                        width: "45%",
                                        margin: "2px",
                                    }}
                                    label="<<"
                                    disabled={this.state.offset === 0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.history.push("/?q=" + this.state.query + "&o=" + (this.state.offset - 10));
                                    }}
                                />
                                <RaisedButton
                                    style={{
                                        width: "45%",
                                        margin: "2px",
                                    }}
                                    label=">>"
                                    disabled={(this.state.passports.numberFound < this.state.offset + 10)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.history.push("/?q=" + this.state.query + "&o=" + (this.state.offset + 10));
                                    }}
                                />
                            </div>
                        }
                    </CardText>
                </Card>
            </div>
        );
    }
}
