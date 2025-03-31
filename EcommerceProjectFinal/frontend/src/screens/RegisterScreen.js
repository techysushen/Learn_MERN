import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Row, Col, Button, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../actions/userAction';
//import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const redirect=location.search ? location.search.split('=')[1] : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const userRegister = useSelector(state=>state.userRegister);
  const {loading,error,userInfo}=userRegister;

  const submitHandler=(e)=>{
      e.preventDefault();
      if(password !== confirmPassword){
        setMessage('Password do not match')
      }else{
        dispatch(register(email,password,name))
      }
      
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
          <h1>Sign Up</h1>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>Register</Button>
          </Form>

          <Row className='py-3'>
            <Col>
            Have an Account? <Link to={redirect ? `login?redirect=${redirect}`: '/login'}>Login</Link> 
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}

export default RegisterScreen
