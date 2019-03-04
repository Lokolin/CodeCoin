import React from "react";
import Button from '@material-ui/core/Button';


class Chain extends React.Component{

    render(){
        return(
            <div>
                <Button variant="outlined" color="primary" onClick={this.props.method}> Вывести блокчейн
                </Button>
            </div>
        );
    }
}
export default Chain;