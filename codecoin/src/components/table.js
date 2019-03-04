import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function getChain(){
    const chain = localStorage.getItem('blockchain');
    try {
        return JSON.parse(chain) || []
    }
    catch (e) {
        return []
    }
}

function SimpleTable(props) {
    const { classes } = props;
    const bchain = getChain();
    console.log(bchain);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Хеш-сумма</TableCell>
                        <TableCell align="left">Предыдущая хеш-сумма</TableCell>
                        <TableCell align="left">Время создания</TableCell>
                        <TableCell align="left">Количество транзакций</TableCell>
                        <TableCell align="left">Nonce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bchain.map((chain, index) => (
                    <TableRow key={index}>
                    <TableCell component="th" scope="row">
                    {chain.hash}
                    </TableCell>
                    <TableCell align="left">{chain.previousHash}</TableCell>
                    <TableCell align="center">{(new Date(chain.timestamp)).toLocaleString() }</TableCell>
                    <TableCell align="center">{chain.transactions.length}</TableCell>
                    <TableCell align="center">{chain.nonce}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}



SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);