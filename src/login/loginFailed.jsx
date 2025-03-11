import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export function LoginFailed(props) {
    return(
        <Alert {...props} show={props.message}>{props.message}
            <Button onClick={props.onHide}>Back</Button>
        </Alert>
    );
}