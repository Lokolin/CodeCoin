import React from "react";
import Button from '@material-ui/core/Button';

class Balance extends React.Component{

    render(){
        return(
            <div>
                <Button variant="outlined" color="primary" onClick={this.props.method}> Узнать баланс</Button>
            </div>
        );
    }
}
export default Balance;