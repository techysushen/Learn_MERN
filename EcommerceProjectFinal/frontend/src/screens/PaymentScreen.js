import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Form, Row, Col, Button, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import {savePaymentMethod} from '../actions/cartAction'

const PaymentScreen = () => {
    const navigate = useNavigate(); 
    const location = useLocation();

    const cart = useSelector(state=>state.cart);
    const {shippingAddress} = cart;

    if(!shippingAddress){
      navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      navigate('/placeorder');
    }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label as='legend'>Select Method</Form.Label>
                  <Col>
                    <Form.Check                      
                      type="radio"
                      label="PayPal or Credit Card"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      checked 
                      onChange={(e)=>setPaymentMethod(e.target.value)}
                    />
                    {/* <Form.Check                      
                      type="radio"
                      label="PayPal or Credit Card"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      checked 
                      onChange={(e)=>setPaymentMethod(e.target.value)}
                    /> */}
                  </Col>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3'>Continue</Button>
              </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentScreen
