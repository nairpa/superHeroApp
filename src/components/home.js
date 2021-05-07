import React from 'react';
import Team from '../components/team';
import Sidebar from '../components/sidebar';
import { Container, Form, Button, ListGroup, Row, Col, Alert } from 'react-bootstrap';

const SearchForm = ({team, setTeam, data, setData, search, setSearch, alert, setAlert, seeMore, setSeeMore, showTeamDetail, setShowTeamDetail}) => {
    const handleClick = (id, heroe) => {
        let filterId = team.heroes.map((el) => el.id) 
        if(!filterId.includes(id)) {
            if(team.good === 3 && heroe.biography.alignment === 'good') {  
                setAlert({
                    show: true, text: 'You can only have 3 good heroes in your team.'
                })  
                return(null)
            }
            if(team.bad === 3 && heroe.biography.alignment === 'bad') {   
                setAlert({
                    show: true, text: 'You can only have 3 bad heroes in your team.'
                }) 
                return(null)
            }
            if(team.heroes.length === 6) {
                setAlert({
                    show: true, text: 'Your team is complete!'
                }) 
                return(null)
            }
            return (
                setTeam({
                    heroes: [...team.heroes, heroe],
                    good: heroe.biography.alignment === 'good' ? team.good +1 : team.good,
                    bad: heroe.biography.alignment === 'bad' ? team.bad +1 : team.bad,
                    powerstats: {
                        ...team.powerstats,
                        intelligence: parseInt(heroe.powerstats.intelligence) + team.powerstats.intelligence,
                        combat: parseInt(heroe.powerstats.combat) + team.powerstats.combat,
                        strength: parseInt(heroe.powerstats.strength) + team.powerstats.strength,
                        speed: parseInt(heroe.powerstats.speed) + team.powerstats.speed,
                        durability: parseInt(heroe.powerstats.durability) + team.powerstats.durability,
                        power: parseInt(heroe.powerstats.power) + team.powerstats.power,
                    },
                    height: {
                        ...team.height,
                        cm: parseInt(heroe.appearance.height[1]) + team.height.cm
                    },
                    weight: {
                        ...team.weight,
                        kg: parseInt(heroe.appearance.weight[1]) + team.weight.kg
                    },
                })
            )
        } else {
            setAlert({
                    show: true, text: `${heroe.name} is already in your team!`
                }) 
        }           
    } 

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = async() => {
        let response = await fetch(`https://superheroapi.com/api.php/10222925296694264/search/${search}`)
        if (response.ok) {
            let json = await response.json()
           setData(json.results)
        } else {
            alert('ERROR,' + response.status);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(search) {
            handleSearch()
        } else {
            return null
        }    
    }
    
    return (
        <>
        <Container>
        {alert.show ? <Alert dismissible onClose={() => setAlert({...alert, show: !alert.show})} variant='dark'>{alert.text}</Alert> : null}
        
        <Form class='formContainer' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
                <Form.Label htmlFor='search'></Form.Label>
                <Form.Control type='text' name='search' value={search} onChange={(e) => handleChange(e)} />
                <Button variant='dark' type='submit' name='submit' value='search'>Search</Button>
            </Form.Group>    
        </Form>
            <ListGroup variant='flush'>
                {data === undefined ? <Alert variant='dark'> There are no results for your search</Alert> : data.map((heroe) => {
                    const {id, name, image} = heroe
                    return (
                        <ListGroup.Item heroe={heroe} variant='light' key={id} className='searchItem'>
                            <Row>
                                <Col>
                                <h4>{name}</h4>
                                <Button variant='dark' onClick={() => handleClick(id, heroe)} name={name}>Add to Team</Button> 
                                </Col>
                                <img className='searchImg' alt={name} src={image.url}/>  
                            </Row>
                        </ListGroup.Item> 
                    )
                })}
            </ListGroup>
        

        <Team team={team} setTeam={setTeam} seeMore={seeMore} setSeeMore={setSeeMore}/>
        </Container>
        <Sidebar team={team} showTeamDetail={showTeamDetail} setShowTeamDetail={setShowTeamDetail}/>
        </>
    )
}

export default SearchForm