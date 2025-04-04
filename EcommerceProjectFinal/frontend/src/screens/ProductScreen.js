import React, { useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import {listProductDetails} from '../actions/productAction'
//import axios from 'axios'    
import Loader from '../components/Loader';
import Message from '../components/Message'

const ProductScreen = () => {
  const { id } = useParams();    
  const navigate = useNavigate(); 
  const [qty,setQty] = useState(1)
  const dispatch = useDispatch();
  const productDetails = useSelector(state=>state.productDetails);
  console.log(productDetails);
  const{loading,error,product}=productDetails;
    useEffect(() => {
      dispatch(listProductDetails(id))
    }, [id, dispatch])

  //const product=[];
  const addToCartHandler=()=>{
    navigate(`/cart/${id}?qty=${qty}`);
  }
  return (
    <>
      <Link to="/" className='btn btn-light my-3'>Go Back</Link>
      {
          loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (<Row>
            <Col md={6}><Image src={product.image} alt={product.name} /></Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>              
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text= {`${product.numReviews} reviews`} />             
                </ListGroup.Item>
                <ListGroup.Item>
                   price : &#8377; {product.price}       
                </ListGroup.Item>
                <ListGroup.Item>
                    Description : {product.description}      
                </ListGroup.Item>
    
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>&#8377; {product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>            
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? 'In Stock':'Out of stock'}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(x=><option key={x+1} value={x+1}>{x+1}</option>)}
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>}
                  
                  <ListGroup.Item>
                    <Button className='btn btn-block' onClick={addToCartHandler} type='button' disabled={product.countInStock===0}>Add To Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>)
        }
     
    </>
  )
}

export default ProductScreen
