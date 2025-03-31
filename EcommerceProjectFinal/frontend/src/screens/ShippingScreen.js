import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Form, Row, Col, Button, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import {saveShippingAddress} from '../actions/cartAction'
//import FormContainer from '../components/FormContainer'

const ShippingScreen = () => {
  const navigate = useNavigate(); 
  const location = useLocation();

  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  
  const dispatch = useDispatch();

  const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(saveShippingAddress({address,city,postalCode,country}));
      navigate('/payment');      
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
            <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' placeholder='Enter city name' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type='text' placeholder='Enter Country Name' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>Continue</Button>
          </Form>

          
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingScreen
