import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return ['Выбор документ и загрузка его на сервер', 'Занесение документа в блокчейн', 'Проверка'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Вы загржаете документ на сверер. Над вашим файлом производится преобразование в хеш функцию. В блок добавляется 
            транзакция содержащая ваш логин (как создателя) и хеш-сумма от вашего документа.`;
        case 1:
            return 'Вы или какой либо другой пользователь, закрываете(ают) блок и находят число при котором хеш-сумма от блока' +
                ' будет начинатся с 4 нулей';
        case 2:
            return `После того как блок с вашей транзакицей попал в блокчейн вы всегда сможете проверить существует ли данный файл. 
            Перейдя во вкладку "Проверить документ", введите создателя документа и хеш-сумму`;
        default:
            return 'Unknown step';
    }
}

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index)}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.button}
                                        >
                                            Назад
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Закончить' : 'Далее'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>Краткая инструкция закончена!</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Сбросить
                        </Button>
                    </Paper>
                )}
            </div>
        );
    }
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);