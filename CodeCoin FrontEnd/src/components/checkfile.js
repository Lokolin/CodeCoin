import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from "./balance";
import RaisedButton from 'material-ui/RaisedButton';

class ChekFile extends React.Component{

    render(){
        return(
            <MuiThemeProvider >
                <form onSubmit={this.props.method} style={style}>
                    <TextField
                        hintText="Логин создателя документа"
                        floatingLabelText="Логин"
                        name="login"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Введите хеш документа"
                        floatingLabelText="Хеш"
                        name="hash"
                        onChange = {(event,newValue) => this.setState({hash:newValue})}
                    />
                    <RaisedButton variant="outlined" color="primary" type="submit" label="Проверить документ"
                                  primary={true}/>
                    {/*<Button variant="outlined" color="primary" type="submit" label="Проверить документ"*/}
                              {/*primary={true}/>*/}
                </form>
            </MuiThemeProvider>
        );
    }
}

const style = {
    padding:30,
    width: 200,
    margin: "auto",
}


export default ChekFile;