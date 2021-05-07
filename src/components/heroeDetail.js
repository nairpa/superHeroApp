import React from 'react';
import {Col, Row} from 'react-bootstrap';
const HeroeDetail = ({team, id}) => {
    return (
        <div className='hero-detail' md='1' s='1'>
            {team.heroes.map((detail) => {
                if (detail.id === id) {
                return (
                <Col key={detail.id}>
                    <Row>
                        <p>Full Name:</p><p>{detail.biography['full-name']}</p>
                    </Row>
                    <Row>
                        <p>Alias:</p><ul>{detail.biography.aliases.map((alias, i) => <li key={i}>{alias}</li> )}</ul>
                    </Row>
                    <Row>
                        <p>Eye Color:</p><p>{detail.appearance['eye-color']}</p>
                    </Row>
                    <Row>
                        <p>Hair Color:</p><p>{detail.appearance['hair-color']}</p>
                    </Row>
                    <Row>
                        <p>Work Base: </p><p>{detail.work.base}</p>
                    </Row>                   
                </Col>
                )
            }})}
        </div>
    )
}

export default HeroeDetail