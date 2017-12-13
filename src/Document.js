import React, {Component} from "react";
import {Card, CardText} from "material-ui/Card";
import {List, ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import ActionCreditCard from "material-ui/svg-icons/action/credit-card";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IconButton from "material-ui/IconButton";
import resizeImage from "resize-image";
import {DatePicker, Divider, RaisedButton, TextField} from "material-ui";
import {ActionDeleteForever, EditorAttachFile, ImageAddAPhoto} from "material-ui/svg-icons/index";
import moment from "moment";

const imageInput = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
};

export default class Document extends Component {

    state = {
        files: [],
    };

    componentWillMount() {
        this.fetchDocument();
        this.fetchFiles();
    }

    fetchDocument() {
        this.props.setWorkInProgress(true);

        fetch("https://" + this.props.appId + "/" + this.props.match.params.passportKey, {method: 'GET'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                this.setState({
                    document: responseJson,
                    room: responseJson.room ? responseJson.room : "",
                    checkin: new Date(responseJson.checkin),
                    checkout: new Date(responseJson.checkout),
                    comment: responseJson.comment ? responseJson.comment : "",
                });
                this.props.setWorkInProgress(false);
            })
            .catch(error => {
                console.error(error);
                this.props.setAlterError();
            });
    }

    fetchFiles() {
        this.props.setWorkInProgress(true);

        fetch("https://" + this.props.appId + "/files/" + this.props.match.params.passportKey, {method: 'GET'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                this.setState({files: responseJson});
                this.props.setWorkInProgress(false);
            })
            .catch(error => {
                console.error(error);
                this.props.setAlterError();
            });
    }

    leftAvatar() {
        return (this.state.document.documentType === "P")
            ? <Avatar
                src={this.props.storageRootUrl + "/" + this.props.appId + "/" + this.state.document.client + "/" + this.props.match.params.passportKey + "/head.jpg"}/>
            : <ActionCreditCard/>;
    }

    deleteFile(imageKey) {
        this.props.setWorkInProgress(true);

        fetch("https://" + this.props.appId + "/files/" + imageKey, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    this.fetchFiles();
                    this.props.setActionDone();
                } else {
                    console.error(response.statusText);
                    this.props.setAlterError();
                }
            });
    }

    imageChanged(event) {
        this.props.setWorkInProgress(true);

        const reader = new FileReader();
        const file = event.target.files[0];
        const self = this;

        reader.onload = function (upload) {
            let dataUrl = upload.target.result;
            let image = new Image();
            image.src = dataUrl;
            image.onload = () => {
                const data = resizeImage.resize(image, 600, 400, resizeImage.JPEG);
                fetch("https://" + self.props.appId + "/images/" + self.state.document.client + "/" + self.props.match.params.passportKey, {
                    method: "POST",
                    headers: {"Content-Type": "application/octet-stream"},
                    body: data.substring(data.indexOf("base64,") + 7),
                })
                    .then(response => {
                        if (response.ok) {
                            self.fetchFiles();
                            self.props.setActionDone();
                        } else {
                            console.error(response.statusText);
                            this.props.setAlterError();
                        }
                    });
            };
        };
        reader.readAsDataURL(file);
    }

    fileChanged(event) {
        this.props.setWorkInProgress(true);

        const formData = new FormData(document.getElementById("fileForm"));

        fetch("https://" + this.props.appId + "/files/" + this.state.document.client + "/" + this.props.match.params.passportKey, {
            method: "POST",
            body: formData,
        }).then(response => {
            if (response.ok) {
                this.fetchFiles();
                this.props.setActionDone();
            } else {
                console.error(response.statusText);
                this.props.setAlterError();
            }
        });

    }

    submit() {
        this.props.setWorkInProgress(true);

        fetch("https://" + this.props.appId + "/" + this.props.match.params.passportKey, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                room: this.state.room,
                checkin: this.state.checkin,
                checkout: this.state.checkout,
                comment: this.state.comment,
            }),
        })
            .then(response => {
                if (response.ok) {
                    this.fetchDocument();
                    this.props.setActionDone();
                } else {
                    console.error(response.statusText);
                    this.props.setAlterError();
                }
            });
    }

    print() {
        this.props.history.push("/print/" + this.props.match.params.passportKey);
    }

    render() {
        if (!this.state.document) {
            return null;
        }
        return (
            <Card>
                <CardText>
                    <List>
                        <ListItem
                            leftAvatar={this.leftAvatar()}
                            primaryText={
                                <div>
                                    <div>
                                        {
                                            this.state.document.firstName
                                            + " "
                                            + this.state.document.lastName
                                        }
                                    </div>
                                    {
                                        this.state.document.room &&
                                        <small>
                                            Room {this.state.document.room}
                                        </small>
                                    }
                                    <div>
                                        <small>
                                            {
                                                moment(this.state.document.checkin).format("YYYY-MM-DD")
                                                + " to "
                                                + moment(this.state.document.checkout).format("YYYY-MM-DD")
                                            }
                                        </small>
                                    </div>
                                </div>
                            }
                            secondaryText={
                                <span>
                                                            {
                                                                this.state.document.country
                                                                + " - "
                                                                + this.state.document.documentNumber
                                                                + " ("
                                                                + this.state.document.sex
                                                                + ")"
                                                            }
                                    <br/>
                                    {this.state.document.birthDate}
                                </span>
                            }
                        />
                    </List>
                    <Divider/>
                    <h3>Booking</h3>
                    <TextField
                        id="room"
                        fullWidth={true}
                        value={this.state.room}
                        floatingLabelText="Room"
                        floatingLabelFixed={true}
                        onChange={(event) => this.setState({room: event.target.value})}
                    />
                    <DatePicker
                        id="checkin"
                        fullWidth={true}
                        value={this.state.checkin}
                        floatingLabelText="Checkin"
                        floatingLabelFixed={true}
                        onChange={(event, value) => this.setState({checkin: value})}
                    />
                    <DatePicker
                        id="checkout"
                        fullWidth={true}
                        value={this.state.checkout}
                        floatingLabelText="Checkout"
                        floatingLabelFixed={true}
                        onChange={(event, value) => this.setState({checkout: value})}
                    />
                    <TextField
                        id="comment"
                        fullWidth={true}
                        value={this.state.comment}
                        floatingLabelText="Comment"
                        floatingLabelFixed={true}
                        multiLine={true}
                        rows={5}
                        onChange={(event) => this.setState({comment: event.target.value})}

                    />
                    <RaisedButton
                        style={{
                            marginBottom: "20px",
                        }}
                        primary={true}
                        fullWidth={true}
                        label="Submit"
                        onTouchTap={() => this.submit()}
                    />
                    {
                        (this.state.document.documentType === "P") &&
                        <div>
                            <div
                                style={{
                                    marginBottom: "20px",
                                }}
                            >
                                <h3>Passport</h3>
                                <a href={this.props.storageRootUrl + "/" + this.props.appId + "/" + this.state.document.client + "/" + this.state.document.key + "/document.jpg"}>
                                    <img
                                        src={this.props.storageRootUrl + "/" + this.props.appId + "/" + this.state.document.client + "/" + this.state.document.key + "/document.jpg"}
                                        width="50%" alt=""/>
                                </a>
                            </div>
                            <Divider/>
                        </div>
                    }
                    <h3>Add image</h3>
                    <FloatingActionButton>
                        <ImageAddAPhoto/>
                        <input type="file" accept="images/*" style={imageInput}
                               onChange={(event) => this.imageChanged(event)} alt=""/>
                    </FloatingActionButton>
                    <p/>
                    <List>
                        {
                            this.state.files
                                .filter(file => file.fileName.endsWith(".jpg"))
                                .sort((a, b) => a.timestamp - b.timestamp)
                                .map((file, index) =>
                                    (
                                        <ListItem
                                            key={index}
                                            primaryText={<img width="50%" alt=""
                                                              src={this.props.storageRootUrl + "/" + this.props.appId + "/" + this.state.document.client + "/" + this.state.document.key + "/" + file.fileName}/>}
                                            onTouchTap={() => window.open(this.props.storageRootUrl + "/" + this.props.appId + "/" + this.state.document.client + "/" + this.state.document.key + "/" + file.fileName)}
                                            rightIconButton={
                                                <IconButton
                                                    onTouchTap={(e) => {
                                                        e.preventDefault();
                                                        this.deleteFile(file.key);
                                                    }}
                                                >
                                                    <ActionDeleteForever/>
                                                </IconButton>
                                            }
                                        >
                                        </ListItem>
                                    )
                                )
                        }
                    </List>
                    <Divider/>
                    <h3>Add file</h3>
                    <FloatingActionButton>
                        <EditorAttachFile/>
                        <form
                            id="fileForm"
                            action={"https://" + this.props.appId + "/files/" + this.state.document.client + "/" + this.state.document.key}
                            method="post"
                            encType="multipart/form-data">
                            <input
                                type="file"
                                name="file"
                                accept="application/pdf"
                                style={imageInput}
                                onChange={(event) => this.fileChanged(event)}/>
                        </form>
                    </FloatingActionButton>
                    <p/>
                    <List>
                        {
                            this.state.files
                                .filter(file => !file.fileName.endsWith(".jpg"))
                                .sort((a, b) => a.timestamp - b.timestamp)
                                .map((file, index) =>
                                    (
                                        <ListItem
                                            key={index}
                                            primaryText={file.fileName}
                                            onTouchTap={() => window.open(this.props.storageRootUrl + "/" + this.props.appId + "/" + this.state.document.client + "/" + this.state.document.key + "/" + file.fileName)}
                                            rightIconButton={
                                                <IconButton
                                                    onTouchTap={(e) => {
                                                        e.preventDefault();
                                                        this.deleteFile(file.key);
                                                    }}
                                                >
                                                    <ActionDeleteForever/>
                                                </IconButton>
                                            }
                                        >
                                        </ListItem>
                                    )
                                )
                        }
                    </List>
                </CardText>
            </Card>
        );
    }
}
