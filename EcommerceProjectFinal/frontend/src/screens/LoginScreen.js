import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Row, Col, Button, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {login} from '../actions/userAction';
//import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const redirect=location.search ? location.search.split('=')[1] : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector(state=>state.userLogin);
  const {loading,error,userInfo}=userLogin;

  const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(login(email,password))
  }

  useEffect(()=>{
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, redirect])

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>Sign In</Button>
          </Form>

          <Row className='py-3'>
            <Col>
            New Customer? <Link to='/register'>Register</Link> 
            {/* New Customer? <Link to={redirect ? `register?redirect=${redirect}`: '/register'}>Register</Link>  */}
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
