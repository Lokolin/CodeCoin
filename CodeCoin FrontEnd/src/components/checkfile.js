import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


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
                    <Button variant="outlined" color="primary" type="submit" > Проверить документ</Button>
                    {/*<RaisedButton variant="outlined" color="primary" type="submit" style={{color:"#3f51b5"}} label="Проверить документ"
                                  primary={true}/>*/}
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