import {Component} from '../core/component'

export class Main extends Component {
    constructor(id) {
        super(id)

    }

    init() {
        // this.$el.addEventListener('click', tabClickHandler.bind(this))
        this.$el.innerHTML = `
            <div class="wrapper">
            <div class="content">
                <header class="header">
                    <div class="header__img">Картинка</div>
                    <div class="header__text">Текст</div>
                </header>
                <div class="container">
                    <div class="menu">
                        <ul class="menu__list">
                            <li class="menu__item">1</li>
                            <li class="menu__item">2</li>
                            <li class="menu__item">3</li>
                            <li class="menu__item">4</li>
                        </ul>
                    </div>
                    <div class="field">
                        <div class="field__content">
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, deleniti est. Delectus possimus dolor voluptatibus quibusdam debitis cum repudiandae provident.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, deleniti est. Delectus possimus dolor voluptatibus quibusdam debitis cum repudiandae provident.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, deleniti est. Delectus possimus dolor voluptatibus quibusdam debitis cum repudiandae provident.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, deleniti est. Delectus possimus dolor voluptatibus quibusdam debitis cum repudiandae provident.</p>
                        </div>
                        <div class="field__textarea">
                            <textarea class="field__textarea_input" rows="5" cols="60"></textarea> 
                        </div>
                        <div class="field__textarea_button">
                            <button>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="footer__area">Подвал</div>
            </footer>
            </div>
        `
    }

   

}