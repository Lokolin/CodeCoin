import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';

class CreateTransaction extends React.Component{

    render(){
        return(
            <MuiThemeProvider >
                <form onSubmit={this.props.method} style={style}>
                    <TextField
                        hintText="Кому вы хотите отправить"
                        floatingLabelText="Получатель"
                        name="toAddress"
                        onChange = {(event,newValue) => this.setState({toAddress:newValue})}
                    />
                    <br/>
                    <TextField
                        hintText="Введите сумму"
                        floatingLabelText="Сумма"
                        name="amount"
                        onChange = {(event,newValue) => this.setState({amount:newValue})}
                    />
                    <Button variant="outlined" color="primary" type="submit" > Перевести</Button>
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


export default CreateTransaction;