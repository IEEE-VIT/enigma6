import React from 'react';
import './LeaderBoard.css';
import Loader from '../../components/loader/loader';
import cookie from 'react-cookies';
import Sponsor from '../../components/Sponsor/Sponsor'; 

class LeaderBoard extends React.Component {

    constructor(){
        super();
        this.state={
            a: [
                {
                "name": "",
                "points": 0,
                "rank": 0,
                "level": 0
                }
            ],
            curPlayer: {},
            loading: true
        };
    }

    reloadPage = () => {
        window.location.reload()
    }
    componentWillMount=()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/leaderBoard`,{
            method: "post",
            headers: {
                'Content-type':'application/json',
                'Authorization': "Bearer "+cookie.load('enigma6').uid//user.uid
            }
        }).then(res=>res.json())
        .then((data)=>{
            //data=data.payload.leaderBoard;
            this.setState({a: data.payload.leaderBoard});
            this.setState({curPlayer: data.payload.curPlayer});
            // var i;
            // var b=[]
            // var arr=data.payload.leaderBoard;
            // for(i=0;i<data.payload.leaderBoard.length;i++)
            //  {
            //     b.push(data.payload.leaderBoard[i].name);
            //  }

            //  if(b.includes(data.payload.curPlayer.name)){
            //      this.setState({curPlayer: null});
            //  }
            // else{
            //     this.setState({curPlayer: data.payload.curPlayer});
            // }
            this.setState({loading: false});
        });
    }
    render() {
        return(
            this.state.loading
            ?
            <div className="load">
                <Loader/>
                <div>The leaderboard may take a while to load</div>
            </div>
            :<div className='maindiv'>
            <div onClick={this.reloadPage}><button className='Back__button'> <span className='glyphicon glyphicon-chevron-left'></span> Go Back </button></div>
                <div id="table-holder">
                    <h3>Leaderboard</h3>
                    <p align="center"><em>Showing only the top 25 ranks</em></p>
                    <table id="leaderboard-table">
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Solved</th>
                            <th>Score</th>
                        </tr>
                        {
                            this.state.a.map((val) => {
                                if (val.name === this.state.curPlayer.name) {
                                    return(
                                    <tr style={{'color':'white','fontWeight':'bolder','backgroundColor':'#00A86B'}}>
                                        <td>{val.rank}</td>
                                        <td>{val.name}</td>
                                        <td>{val.level - 1}</td>
                                        <td>{Math.round(parseFloat(val.points))}</td>
                                    </tr>
                                    );
                                } else {
                                    return(
                                    <tr>
                                        <td>{val.rank}</td>
                                        <td>{val.name}</td>
                                        <td>{val.level - 1}</td>
                                        <td>{Math.round(parseFloat(val.points))}</td>
                                    </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </div>
                <Sponsor pos="relative"/>
            </div>
        );
    }
}

export default LeaderBoard;
                             