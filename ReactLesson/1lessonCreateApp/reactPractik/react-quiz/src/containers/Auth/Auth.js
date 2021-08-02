import React from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

class Auth extends React.Component {

    loginHandler = () => {

    }

    registerHandler = () => {
        
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    render() {
        return(
            <div className={'Auth'}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={'AuthForm'}>
                        
                        <Input 
                            label="email" 
                        />

                        <Input 
                            label="Пароль"
                            errorMessage={'TEST'}
                        />

                        <Button 
                            type="successSS"
                            onClick={this.loginHandler}
                        >
                            Войти
                        </Button>

                        <Button 
                            type="primary"
                            onClick={this.registerHandler}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth