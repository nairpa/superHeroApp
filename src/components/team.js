import React from 'react';
import HeroeDetail from '../components/heroeDetail';
import { Container, Col, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'

const Team = ({team, setTeam, seeMore, setSeeMore}) => {
    const handleDelete = (id, alignment, heroe) => {
       setTeam({
            heroes: team.heroes.filter((heroe) => {
                return heroe.id !== id
            }),
            good: alignment === 'good' ? team.good -1 : team.good, 
            bad: alignment === 'bad' ? team.bad -1 : team.bad, 
            powerstats: {
                ...team.powerstats,
                intelligence: team.powerstats.intelligence - parseInt(heroe.powerstats.intelligence),
                combat: team.powerstats.combat - parseInt(heroe.powerstats.combat),
                strength: team.powerstats.strength - parseInt(heroe.powerstats.strength),
                speed: team.powerstats.speed - parseInt(heroe.powerstats.speed),
                durability: team.powerstats.durability - parseInt(heroe.powerstats.durability),
                power: team.powerstats.power - parseInt(heroe.powerstats.power),
            },
            height: {
                ...team.height,
                cm: team.height.cm - parseInt(heroe.appearance.height[1])
            },
            weight: {
                ...team.weight,
                kg: team.weight.kg - parseInt(heroe.appearance.weight[1])
            },
        })
    }

    const popoverDetail = (
        <Popover>
            <Popover.Title>{seeMore.name}</Popover.Title>
            <Popover.Content>
                {seeMore.show ? <HeroeDetail team={team} id={seeMore.id}/> : null} 
            </Popover.Content>
        </Popover>
    )
    return (
        <Container fluid='sm'>
            <Row xlg='3' lg='3' md='2' xs='1' className='justify-content-md-center'>     
                {team.heroes.map((heroe) => {
                    const {id, name, image, biography} = heroe 
                    const {alignment} = biography   
                    return (
                        <Col key={id} className='teamItem'> 
                            <h2>{name}</h2>
                            <img alt={name} src={image.url}></img> 
                            <Col className='teamPowers'>
                                {Object.entries(heroe.powerstats).map((power, key) => {
                                    return <Row className='.itemPower' key={key}>{power.map((stat, index) => <p key={index}> {stat} </p>)}</Row>
                                })}
                                                             
                            </Col>  
                            <Row className='justify-content-md-center'>
                                <OverlayTrigger trigger={['hover', 'trigger']} placement="right" overlay={popoverDetail}>
                                    <Button className='btn' variant='dark'  onMouseLeave={() => setSeeMore({...seeMore, id: id, show: !seeMore.show, name: name})} onMouseEnter={() => setSeeMore({...seeMore, id: id, show: !seeMore.show, name: name})}><i className="fas fa-info-circle"></i></Button>
                                </OverlayTrigger>
                                <Button className='btn' variant='danger' onClick={() => handleDelete(id, alignment, heroe)}><i className="fas fa-trash"></i></Button>
                            </Row>    
                        </Col>
                    )  
                }
                )}
            </Row>  
        </Container>
    )
}

export default Team