import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';


class Authorization extends React.Component{

    constructor(props){
        super(props);
        this.state={
            login:'',
            password:''
        }
    }

    render(){
        return(
            <MuiThemeProvider >
                <Card style={style}>
                    <CardContent>
                        <form style={cardStyle}>
                            <TextField
                                hintText="Введите свой логин"
                                floatingLabelText="Логин"
                                name="login"
                                onChange = {(event,newValue) => this.setState({login:newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Введите свой пароль"
                                floatingLabelText="Пароль"
                                name="password"
                                onChange = {(event,newValue) => this.setState({password:newValue})}
                            />
                            <br/>
                            <br/>
                            <Grid container spacing={8}>
                                <Grid item xs={4}>
                                    <RaisedButton onClick = {event => this.props.method(event, this.state.login, this.state.password)} style={button} type="submit" label="Войти" primary={true} />
                                </Grid>
                                <Grid item xs={7}>
                                    <RaisedButton onClick = {event => this.props.reg(event, this.state.login, this.state.password)} type="submit" label="Зарегистироватся" primary={true} />
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </MuiThemeProvider>
        );
    }
}

const cardStyle = {
    padding: 0,
    minWidth: 200,
    height: 150,
    margin: "auto",
}

const style = {
    padding:30,
    width: 300,
    height: 250,
    margin: "auto",
}

const button = {
    marginLeft: "auto",
}

export default Authorization;