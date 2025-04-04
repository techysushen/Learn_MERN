import React, { useEffect,useState } from 'react'
import {useParams,Link, useLocation, useNavigate} from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderAction';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const orderId = id;
    const [sdkReady, setSdkReady] = useState(false);
        
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const {order, error, loading} = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const {loading:loadingPay, success:successPay} = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver;

    const userLogin = useSelector((state => state.userLogin));
    const {userInfo} = userLogin;

    if(!loading){
        order.itemsPrice = order.orderItems.reduce((acc,item)=>acc+item.qty* item.price,0).toFixed(2);
    }

    //const {shippingAddress, paymentMethod, cartItems} = order;
    //const {address, city, postalCode, country} = shippingAddress;

    useEffect(() => {
        const addPayPalScript = async () => {
            const {data:clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type='text/javascript';
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async=true;
            script.onload=()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
            console.log("paypal: ",window.paypal);
        }

        if(!order || successPay || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSdkReady(true);
            }
        }

        
    }, [dispatch, orderId, order, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
       // console.log("paymentResult: ", paymentResult);
       dispatch(payOrder(orderId,paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }
    
  return loading ? (<Loader />):error ? (<Message variant='danger'>{error}</Message>):(
    <>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Shipping</strong>
                        {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (<Message variant='success'>Delivered On {order.deliveredAt}</Message>) : (<Message variant='danger'>Not Delivered</Message>)
                    }
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (<Message variant='success'>Paid On {order.paidAt}</Message>) : (<Message variant='danger'>Not Paid</Message>)
                    }
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length===0? (<Message>Your cart is empty</Message>):(
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index)=>{
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
                            <Col>&#8377; {order.itemsPrice}</Col>
                        </Row>                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>&#8377; {order.shippingPrice}</Col>
                        </Row>                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>&#8377; {order.taxPrice}</Col>
                        </Row>                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>&#8377; {order.totalPrice}</Col>
                        </Row>                        
                                                       
                    </ListGroup.Item>
                    {
                        !order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (<Loader />) : <PayPalButton amount={order.totalPrice} 
                                onSuccess={successPaymentHandler}
                                />}
                            </ListGroup.Item>
                        )
                    }
                    {loadingDeliver && <Loader />}
                    {
                    userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                Mark As Delivered
                            </Button>
                        </ListGroup.Item>
                    )
                }
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )

}

export default OrderScreen
