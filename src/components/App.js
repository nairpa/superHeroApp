import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './loginForm';
import Home from './home';

const App = () => {
    const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE"
    const [token, setToken] = useState( localStorage.getItem('token') || '')
    const [user, setUser] = useState({email: '', password: ''});
    const [error, setError] = useState(false);
    const [alert, setAlert] = useState({
        show: false, 
        text: ''
    })
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [team, setTeam] = useState({
        heroes: [],
        good: 0,
        bad: 0,
        powerstats: {
            intelligence: 0,
            combat: 0,
            strength: 0,
            speed: 0,
            durability: 0,
            power: 0,
        },
        height: {
            cm: 0,
        },
        weight: {
            kg: 0,
        },
    })
    const [seeMore, setSeeMore] = useState({
        id: 0, 
        show: false, 
        name:''
    })
    const [showTeamDetail, setShowTeamDetail] = useState(false)

    useEffect(() => {
        localStorage.setItem('token', token)
    },[token])
    
    if(token !== apiToken) {
        return (
            <Login 
                token={token} 
                setToken={setToken} 
                error={error} 
                setError={setError} 
                user={user} 
                setUser={setUser} 
                alert={alert} 
                setAlert={setAlert}
            />
        )
    } 
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/'>
                    <Home 
                        team={team} 
                        setTeam={setTeam} 
                        data={data} 
                        setData={setData} 
                        alert={alert} 
                        setAlert={setAlert} 
                        search={search} 
                        setSearch={setSearch} 
                        seeMore={seeMore} 
                        setSeeMore={setSeeMore} 
                        showTeamDetail={showTeamDetail} 
                        setShowTeamDetail={setShowTeamDetail}
                    />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App