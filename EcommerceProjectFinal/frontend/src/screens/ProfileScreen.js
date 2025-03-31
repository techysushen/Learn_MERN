import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserProfile} from '../actions/userAction';
import { listMyOrders } from "../actions/orderAction";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = () => {
  const navigate = useNavigate(); 
  //const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  //profile reducer
  const userDetails = useSelector(state=>state.userDetails);
  const {loading,error,user}=userDetails;
 //login reducer
  const userLogin = useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;

  const userUpdateProfile = useSelector(state=>state.userUpdateProfile);
  const {success} = userUpdateProfile;

  const orderListMy = useSelector(state=>state.orderListMy);
  const {loading:loadingOrders, error:errorOrders, orders} = orderListMy;

  const submitHandler=(e)=>{
      e.preventDefault();
      if(password !== confirmPassword){
        setMessage('Password do not match')
      }else{
        dispatch(updateUserProfile({id:user._id,name,email,password}))
      }
      
  }

  useEffect(()=>{
    if(!userInfo){
      navigate('/login');
    }else{
       // console.log('userInfo:', userInfo);
       if(!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
       }
       setName(user.name);
       setEmail(user.email)
    }
  }, [userInfo, user, navigate, dispatch])

  return (
    <Row>
        <Col md={3}>
          <h1>User Profile</h1> {disabled?<i className='fas fa-edit' onClick={()=>{setDisabled(!disabled)}}></i>:<i className='fas fa-times' onClick={()=>{setDisabled(!disabled)}}></i>}
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control disabled={disabled} type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control disabled={disabled} type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>
              
                {!disabled &&
                <>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control disabled={disabled} type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}></Form.Control>
              </Form.Group>
                </>
                }
              

              <Button type='submit' disabled={disabled} variant='primary'>Update</Button>
          </Form>
        </Col>
        <Col md={9}>My Orders
        {loadingOrders ? (<Loader />):errorOrders? (<Message variant="danger">{errorOrders}</Message>):(
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10) : <i className='fas fa-times' style={{ color:'red' }}></i>}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className='fas fa-times' style={{ color:'red' }}></i>}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
        </Col>
    </Row>     
  )
}

export default ProfileScreen
