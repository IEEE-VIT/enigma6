import React from 'react';

export default class Sponsor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            position: this.props.pos
        }
    }

    componentDidMount(){
        var that = this;
        window.onresize = function(){
            if (window.innerHeight < 460 || (window.innerHeight <= 600 && window.innerWidth >= 514)) {
                that.setState({position: "relative"})
                console.log("change!")
            } else {
                that.setState({position: that.props.pos})
            }
        }
    }

    render(){
        return(
            <footer style={{'position':this.state.position,'z-index':'5'}}>
                <p>Powered by <br></br>  <a rel="noopener noreferrer" target="_blank" href="http://www.deeplearningdemystified.com">Deep Learning Demystified</a></p>
            </footer>
        );
    }
}