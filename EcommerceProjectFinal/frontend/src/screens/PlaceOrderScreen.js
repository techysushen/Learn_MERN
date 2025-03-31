import React, { useEffect } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Row, Col, Button, Image, ListGroup, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {createOrder} from '../actions/orderAction';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const {shippingAddress, paymentMethod, cartItems} = cart;
    const {address, city, postalCode, country} = shippingAddress;
    
    cart.itemsPrice = cart.cartItems.reduce((acc,item)=>acc+item.qty* item.price,0).toFixed(2);
    cart.shippingPrice = cart.itemsPrice > 500 ? 0 : 50;
    cart.taxPrice = Number(0.15*cart.itemsPrice).toFixed(2);
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const {order, success, error, loading} = orderCreate;

    useEffect(() => {
        if(success){
            navigate(`/order/${order?._id}`);
        }
        // eslint-disable-next-line
    }, [success, order?._id])

    const placeOrderHandler=(e)=>{
         dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress : cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice
         }))
    }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Shipping</strong>
                        {address},{city},{postalCode},{country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method:</strong>
                        {paymentMethod}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cartItems.lengrh===0? (<Message>Your cart is empty</Message>):(
                        <ListGroup variant='flush'>
                            {cartItems.map((item,index)=>{
                                return <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.Image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x &#8377; {item.price} = &#8377; {item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            })}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>&#8377; {cart.itemsPrice}</Col>
                        </Row>                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>&#8377; {cart.shippingPrice}</Col>
                        </Row>                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>&#8377; {cart.taxPrice}</Col>
                        </Row>                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>&#8377; {cart.totalPrice}</Col>
                        </Row>                        
                    </ListGroup.Item>
                    
                        {error && <ListGroup.Item> <Message variant='danger'>{error}</Message></ListGroup.Item>}  
                    
                        {loading && <ListGroup.Item> <Loader /> </ListGroup.Item>}          
                     
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cart.cartItems.lengrh===0} onClick={placeOrderHandler} >
                            Place Order
                        </Button>            
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
