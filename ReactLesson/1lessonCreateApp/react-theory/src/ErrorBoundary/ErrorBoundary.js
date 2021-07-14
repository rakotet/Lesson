import React from 'react'

class ErrorBoundary extends React.Component {

    state = {
        hasError: false
    }

    componentDidCatch(error, info) { // отлавливает ошибки и по умному их обрабатывает(придумываем сами как) но главное что приложение не рушется после ошибки, а выводит то что мы напишем (какое нибудь сообщение об ошибки)
        this.setState({hasError: true})
    }

    render() {
        if(this.state.hasError) {
            return <h1 style={{color: 'red'}}>Something went wrong</h1>
        }

        return this.props.children
    }
}

export default ErrorBoundary