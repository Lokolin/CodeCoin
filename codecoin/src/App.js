import React from "react";
import Navbar from "./components/navbar"
import PropTypes from 'prop-types';
import Authorization from './components/authorization';
import { SnackbarProvider, withSnackbar } from 'notistack';
import NavTabs from "./components/tabs"

class App extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loginForm: !localStorage.getItem('login'),
            otherElements: false,
        }
    }

    // componentDidMount(): void {
    //
    // }

    toggleCase = () => {
        this.setState({
            loginForm: !this.state.loginForm,
            otherElements : !this.state.otherElements
        });
    };

    getChain = async (event) => {
        event.preventDefault()
        const myHeaders = new Headers({
            'Content-Type': 'Access-Control-Allow-Headers',
            "Authorization": localStorage.getItem('token'),
        });
        var params = { method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };
        const url = await fetch("http://localhost:5000/blockchain", params);
        const data = await url.json();
        localStorage.setItem('blockchain', JSON.stringify(data.chain));
    }

    updateChain = async () => {
        // event.preventDefault()
        const myHeaders = new Headers({
            'Content-Type': 'Access-Control-Allow-Headers',
        });
        var params = { method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };
        const url = await fetch("http://localhost:5000/events/blockchain/update", params);
        const data = await url.json();
        console.log(data);
    }

    getBalance = async (event) => {
        event.preventDefault()
        const url = await fetch(`http://localhost:5000/balances/${localStorage.getItem('login')}`);
        const data = await url.json();
        this.handleClickVariant(`Ваш баланс: ${data.balance} codecoins`, 'success')
    }

    getAuthorized = async (event, login, password) => {
        event.preventDefault()

        fetch('http://localhost:5000/auth',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({
                login: login,
                password: password,
            }),
        })
            .then(r=> r.text())
            .then(x => {
                if (x !== "Пользователь не существует"){
                    localStorage.setItem('token', x)
                    localStorage.setItem('login', login)
                    this.handleClickVariant('Вы авторизированы!', 'success')
                    this.toggleCase()
                } else {
                    this.handleClickVariant('Введен не правильный логин или пароль!', 'error')
                }
            });
     }

    registration = async (event, login, password) => {
        event.preventDefault()

        fetch('http://localhost:5000/registration',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({
                login: login,
                password: password,
            }),
        })
            .then(r=> r.text())
            .then(x => {
                console.log(x)
                if (x !== "User already exist"){
                    this.mine();
                    this.handleClick(`Вы зарегистированы, ${login}!`);
                } else {
                    this.handleClick(`Такой пользователь уже зарегистрирован!`);
                }
            });
        // this.mine();
    }

    mine = async () => {
        fetch('http://localhost:5000/mine',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token'),
            },
            body:  JSON.stringify({
                rewardAddress: localStorage.getItem('login'),
            }),
        })
            .then(r=> r.text())
            .then(x => {
                console.log(x)
                this.handleClick(`Блок смайнен!`);
            });
    }

    createDeal = async (event) => {
        const hash = event;
        fetch('http://localhost:5000/createDeal',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token'),
            },
            body:  JSON.stringify({
                fromAddress: localStorage.getItem('login'),
                hash: hash,
            }),
        })
            .then(r=> r.text())
            .then(x => {
                console.log(x)
                this.handleClick(`Хеш от вашего документа добавлен в блок!`);
                this.handleClickVariant(hash, "success")
            });
    }

    checkHash = async (event) => {
        const hash = event;
        this.handleClick(`Хеш от вашего документа добавлен в блок!`);
        this.handleClickVariant(hash, "success")

    }

    checkDeal = async (event) => {
        event.preventDefault()
        const login = event.target.elements.login.value;
        const hash = event.target.elements.hash.value;

        fetch('http://localhost:5000/checkDeal',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({
                creator: login,
                hash: hash,
            }),
        })
            .then(r=> r.text())
            .then(x => {
                if (x !== "Данный документ не зарегестрирован в системе."){
                    this.handleClickVariant('Документ существует! Хеш совпадает!', 'success')
                } else {
                    this.handleClickVariant('Данный документ не зарегестрирован в системе. Либо он был изменен!', 'error')
                }
            });
    }

    handleClick = (name) => {
        this.props.enqueueSnackbar(name);
    };

    handleClickVariant = (message, variant) => {
        // variant could be success, error, warning or info
        this.props.enqueueSnackbar(message, { variant });
    };

    render(){
        this.updateChain()
      return (
        <div>
            <Navbar/>
            { this.state.loginForm ? <Authorization method={this.getAuthorized} reg={this.registration}/> : null }
            { !this.state.loginForm? <NavTabs balance={this.getBalance}
                                                chain={this.getChain}
                                                createDeal={this.createDeal}
                                                checkDeal={this.checkDeal}
                                                update={this.updateChain}
                                                checkHash={this.checkHash}
                                                mine ={this.mine}/>: null}
        </div>
      );
    }
}

App.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
};

const MyApp = withSnackbar(App);

function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={7}>
            <MyApp />
        </SnackbarProvider>
    );
}
export default IntegrationNotistack;

