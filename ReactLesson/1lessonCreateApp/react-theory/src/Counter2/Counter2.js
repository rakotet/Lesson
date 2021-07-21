import React from 'react';
import { ClickedContext } from '../App'; // что бы использовать контекст который передавал какой то компанент выше используя .Provider

// что бы использовать переданный контекст используем .Consumer того контекста

export default (props) => {
    return (
        <div style={{border: '1px solid #ccc', width: '200px', margin: '0 auto'}}>
            <h3>Counter2</h3>
            <ClickedContext.Consumer>
                {clicked => clicked ? <p>Clicked</p> : null}
            </ClickedContext.Consumer>
        </div>
    )
}