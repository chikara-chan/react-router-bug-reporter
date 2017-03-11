import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const {children} = this.props
        return(
            <div>
                hello!
                {children}
            </div>
        )
    }
}
export default App
