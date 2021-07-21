import React from 'react'
import './Layout.css'

class Layout extends React.Component {
    render() {
        return (
            <div className={'Layout Layout main'}>


                <main className={'Main'}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout