// Название файла с маленькой буквы т.к. мы создаём не обычный компанент, а компанент обертку 

import React from 'react';

const withClass = (Component, ClassName) => {
    return (props) => {
        return (
            <div className={ClassName}>
                <Component {...props}/>
            </div>
        )
    }
}

export default withClass