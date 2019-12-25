import React from 'react';
import './GetFamiliarCard.css';
import Sponsor from '../../components/Sponsor/Sponsor';

class GetFamiliarCard extends React.Component{
    reloadPage = () => {
        window.location.reload()
    }
    render() {
        return(
            <div>
                <div>
                    <div onClick={this.reloadPage}><button className='Back__button'> <span className='glyphicon glyphicon-chevron-left'></span> Go Back </button></div>
                    <div id="get-familiar">
                        <h4 id="question-heading"><strong>Get Familiar</strong></h4>
                        <div id="rules">
                            <ul>
                                <li>Enigma 6 is an online cryptic event where players solve a series of challenging riddles and puzzles to win exciting cash prizes!</li>
                                <li>The points earned on each question are totally relative to the competition - the sooner you solve a question, the higher your score shall be!</li>
                                <li>Upon using a hint, a one-time penalty of 15% shall be applied on the points earned from the corresponding question.</li>
                                <li>Enigma 6 shall end on 8<sup>th</sup> December, 4:20 PM</li>
                                <li>Participant with most points will be declared winner</li>
                                <li>Any form of malpractice shall be dealt with extreme seriousness. We are constantly trying to enhance the experience and security of the system. Your cooperation is highly appreciated.</li>
                            </ul>
                        </div>
                        <button onClick={() => window.location.reload()} className='getFamiliar__button'>Ok, got it</button>
                        <br></br>
                        <br></br>
                    </div>
            </div>
            <br></br>
            <br></br>
            <Sponsor pos="relative"/>
            </div>
        )
    }
}

export default GetFamiliarCard