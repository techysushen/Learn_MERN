import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';
import Product from '../components/Product';
//import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux';
import {listProducts} from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate'

const HomeScreen = () => {
  //const [products,setProducts] = useState([]);
  const {keyword} = useParams();
  const {pageNumber} = useParams() || 1;
  const dispatch = useDispatch();
  const productList = useSelector(state=>state.productList);
  const {loading,error,products,page,pages} = productList;
  useEffect(() => {
        /* axios.get('/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log("error:", err)) */
        dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])



  return (
    <>
        <h1>Latest Products</h1>
        {
          loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
          <>
          <Row>
            {products.length > 0 ?products.map((products)=>( 
            <Col sm={12} md={6} lg={4} xl={3} key={Product._id}>
              <Product product={products} />
            </Col>
            )) : <Col>No Product Available</Col>}
            
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
          </>
          
          ) }
          
    </>
  )
}

export default HomeScreen
