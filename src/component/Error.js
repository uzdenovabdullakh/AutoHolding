import React from 'react'

const errorStyle = {
    textAlign: 'center',
    color: 'red',
    marginTop: '0px'
}

function Error(props){
    const {error} = props
    return (
        <p style={errorStyle}>
            {error}
        </p>
    );
}


export default Error;