import React, {useEffect} from 'react'
import {useParams,useLocation, useNavigate, Link} from 'react-router-dom';
import {Row,Col,Card,Image, ListGroup, ListGroupItem, Button, Form} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction'
import Message from '../components/Message'

const CartScreen = () => {
const { id } = useParams();
const navigate = useNavigate(); 
const location = useLocation();
const qty = location.search ? Number(location.search.split('=')[1]):1;
const dispatch = useDispatch();
//console.log("qty:", qty);

const cart = useSelector(state => state.cart);
const {cartItems} = cart;
console.log("cartItems:", cartItems);

useEffect(() => {
    dispatch(addToCart(id,qty))
}, [dispatch,id],qty)

const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
}

const checkoutHandler=() => {
  //navigate('/login?redirect=shipping');
  navigate('/shipping');
}

  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length===0 ? <Message>Your cart is empty <Link to="/">Go Back</Link></Message> : (<ListGroup variant='flush'>
              {cartItems.map((item)=>(
                  <ListGroupItem key={item.product}>
                    <Row>
                      <Col md="2">
                        <Image src={item.Image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md="3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md="2">&#8377; {item.price}</Col>
                      <Col md="2">             
                        
                        <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map(x=><option key={x+1} value={x+1}>{x+1}</option>)}
                        </Form.Control>             
                      
                      </Col>
                      <Col md="2">
                        <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
              ))}
              

            </ListGroup>)}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                  <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) Items</h2>
                  &#8377; {cartItems.reduce((acc,item)=>acc+item.qty* item.price,0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>
                  Procees To Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
    </Row>
  )
}

export default CartScreen
