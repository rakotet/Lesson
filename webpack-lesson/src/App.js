import React from 'react'
import $ from 'jquery' // подключаем библтотеку jquery в наш js файл

export default class App extends React.Component {
    componentDidMount() {
        
        // ниже нипишем простой код на jquery

        $('<h1/>')
            .text('Hello world from JQuery')
            .css({
                textAlign: 'center',
                color: 'blue'
            })
            .appendTo($('header'))
    }

    // Ниже код нв React
    render() {
        return (
            <React.Fragment>
                <header></header>

                <hr/>

                <div className="box">
                    <h2 className="box-title">Box title</h2>

                    <p className="box-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Labore porro ab doloribus velit, nesciunt explicabo necessitatibus unde sequi rerum dolore!</p>
                </div>
            </React.Fragment>
        )
    }
}