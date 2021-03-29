import {Component} from '../core/component'
import logo from '../image/logo.svg'

export class Main extends Component {
    constructor(id, user) {
        super(id)
        this.user = user
        this.init()
    }

    init() {
        this.$el.classList.remove('mainStart')

        this.$el.innerHTML = `
            <div class="wrapper">
            <div class="content" id="content">
                <header class="header">
                    <div class="header__img">
                        <img src="${logo}" alt="Сетка">
                    </div>
                    <div class="header__text">${this.user}</div>
                </header>
                <div class="container" id="container">
                    <div class="menu">
                        <ul class="menu__list">
                            <li class="menu__item"><span data-tab="chat">Чат</span></li>
                            <li class="menu__item"><span data-tab="message">Сообщения</span></li>
                            <li class="menu__item"><span data-tab="service">Служебки</span></li>
                            <li class="menu__item"><span data-tab="tasks">Задачи</span></li>
                        </ul>
                    </div>
                    <div class="field">
                        <div class="instructions" data-tab="instructions">Инструкция</div>
                        <div class="field__messages hide" id="field__messages">
                            <div class="field__messages_container"></div>
                            <select>
                                <option>Пункт 1</option>
                                <option>Пункт 2</option>
                            </select>
                            <textarea rows="5" cols="60"></textarea>
                            <button>Отправить</button>
                        </div>
                        <div class="field__service hide">Служебки</div>
                        <div class="field__tasks hide">Задачи</div>
                        <div class="field__chat hide" id="field__chat">
                            <div class="field__content"></div>
                            <div class="field__textarea">
                                <textarea class="field__textarea_input" rows="5" cols="60"></textarea> 
                            </div>
                            <div class="field__textarea_button">
                                <button>Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="footer__area"></div>
            </footer>
            </div>
        `
    }
}