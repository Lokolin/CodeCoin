import React from "react";
import Button from '@material-ui/core/Button';

class Mine extends React.Component{

    render(){
        return(
            <div>
                <Button variant="outlined" color="primary" onClick={this.props.method}> Смайнить блок</Button>
            </div>
        );
    }
}
export default Mine;