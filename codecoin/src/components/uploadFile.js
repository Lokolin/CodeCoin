import React from 'react';
import FileBase64 from 'react-file-base64';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

const SHA256 = require("crypto-js/sha256");


class GetHash extends React.Component {

    constructor() {
        super()
        this.state = {
            files: []
        }
    }

    getFiles = (files) => {
        this.setState({ files: files })
        let hash = SHA256(this.state.files[0].base64).toString();
        this.props.method(hash)
        console.log(hash)
    }

    render() {
        return (
                <FileBase64 style={style} multiple={ true } onDone={ this.getFiles }/>
        )
    }
}

const style = {
    padding:"30!important",
    width: "200!important",
    margin: "auto",
}

export default GetHash;