import React, {useEffect} from 'react';
import axios from 'axios'
import {Button, Alert, Form, Container} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Login = ({setToken, user, setUser, error, setError, alert, setAlert}) => {
    useEffect(() => {
        handleError()
        
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user, [name]:value})
    }

    const handleError = () => {
        if (!user.email || !user.password) {
            setError(true)
        } else {
            setError(false)
        }
    }

    const handlePost = () => {
        axios
            .post('http://challenge-react.alkemy.org', { 
                ...user})
            .then(res =>  setToken(res.data.token))
            .catch(err => console.log(err))
        }
       
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (error) {
           setAlert({...alert, show: true, text: 'Please enter an email and password'})
        } else {
            setAlert({...alert, show: false, text: ''})
            handlePost()
        }        
    }

    return ( 
        <Container fluid className='login-form'>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <h4>Login to start building your Superhero team</h4>
                <Form.Label htmlFor='email'>Email: </Form.Label>
                <Form.Control placeholder='example@email.com' id='email' name='email' onChange={(e) => handleChange(e)} type='email' value={user.email} />
                <Form.Label htmlFor='password'>Password: </Form.Label>
                <Form.Control  placeholder='password' name='password' onChange={(e) => handleChange(e)} value={user.password} type='password'/>
                {alert.show ? <Alert variant='dark'>{alert.text}</Alert> : null}
                <Button variant='dark' id='submit' type='submit' name='submit'>Send</Button>            
            </Form>
        </Container>
    )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login
