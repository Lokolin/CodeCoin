import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UploadFile from "./uploadFile";
import VerticalLinearStepper from "./about"
import CheckFile from "./checkfile"
import Balance from "./balance"
import Chain from "./chain";
import SimpleTable from "./table";
import Grid from '@material-ui/core/Grid';
import Mine from "./mine"

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class NavTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <NoSsr>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                            <LinkTab label="Занести документ" href="page1" />
                            <LinkTab label="Проверить документ" href="page2" />
                            <LinkTab label="Описание работы системы" href="page3" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>
                        <Grid container spacing={0}>
                            <Grid item xs={2}>
                                <Balance method={event => this.props.balance(event)}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Mine method={event => this.props.mine(event)}/>
                            </Grid>
                            <Grid item xs={5}>
                                Занести документ в блокчейн
                                <br/>
                                <UploadFile method={hash => this.props.createDeal(hash)}/>
                            </Grid>
                            <Grid item xs ={2}>
                                <Chain method={event => this.props.chain(event)}/>
                            </Grid>
                        </Grid>
                        <SimpleTable/>
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        <CheckFile method={event => this.props.checkDeal(event)}/>
                        <Grid container spacing={0}>
                            <Grid item xs={5}> </Grid>
                            <Grid item xs={2}>
                                Получить хеш-сумму от файла
                                <UploadFile method={hash => this.props.checkHash(hash)}/>
                            </Grid>
                            <Grid item xs={6}> </Grid>
                        </Grid>
                        </TabContainer>}
                    {value === 2 && <TabContainer>
                        <VerticalLinearStepper/>
                    </TabContainer>}
                </div>
            </NoSsr>
        );
    }
}

NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);