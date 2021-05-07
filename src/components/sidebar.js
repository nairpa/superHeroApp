import React from 'react';
import { Button } from 'react-bootstrap';

const Sidebar = ({team, showTeamDetail, setShowTeamDetail}) => {
    let higherStat = 0
    let index = 0
    
    let higherPower = Object.entries(team.powerstats).map((stat, indx) => {
        if(stat[1] > higherStat) {
           higherStat = stat[1]
           index = indx
        }
        return (stat)
    })
    
    const handleTeamDetail = () => {
        setShowTeamDetail(!showTeamDetail)
    }

    if(showTeamDetail !==
        
        true) {
        return (
            <div>
                <Button onClick={() => handleTeamDetail()}className='teamDetail' variant='dark'><i className="fas fa-angle-up"></i>Team detail</Button>
            </div>  
        )
    } else {
    return (
        <>
        <div className='sidebarContainer'>
        <button onClick={() => handleTeamDetail()} className='closeDetail'><i className="fas fa-times"></i></button>
            <div className='higherStat'>   
                {higherPower[index].map((power, i) => <h5 key={i}>{power}</h5>)}
            </div>
            <div className='teamStats'>
                {higherStat === 0 ? null : Object.entries(team.powerstats).map((stats, i) => { 
                return (
                    <div key={i} className='stats'>
                    {stats.map((stat, i) => { 
                        return(     
                            <p key={i}>{stat}</p>
                        )
                    })}
                    </div>
                )
            })
            }   
            </div>
            <div className='teamHeight'>
                <div>        
                    <p className='teamHW'>Team Height: </p><p>{!parseInt(team.height.cm / team.heroes.length) ? 0 : parseInt(team.height.cm / team.heroes.length)}</p>          
                    <p className='teamHW'>Team Weight: </p><p>{!parseInt(team.weight.kg / team.heroes.length) ? 0 : parseInt(team.weight.kg / team.heroes.length)}</p>
                </div>
            </div> 
        </div>
        </>
    )}
}

export default Sidebar