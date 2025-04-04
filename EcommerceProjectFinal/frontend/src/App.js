import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
  return (
    <Router>
      <Header />      
      <main>
        <Container>
        <Routes> 
          <Route path="/login" exact element={<LoginScreen />} />         
          <Route path="/shipping" exact element={<ShippingScreen />} />         
          <Route path="/payment" exact element={<PaymentScreen />} />         
          <Route path="/placeorder" exact element={<PlaceOrderScreen />} />         
          <Route path="/order/:id" exact element={<OrderScreen />} />         
          <Route path="/profile" exact element={<ProfileScreen />} />         
          <Route path="/register" exact element={<RegisterScreen />} />         
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />  
          <Route path="/admin/userlist" element={<UserListScreen />} />  
          <Route path="/admin/productlist" element={<ProductListScreen />} exact />  
          <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} exact />  
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />  
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />  
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/search/:keyword' element={<HomeScreen />} exact />
          <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
          <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} exact />
          <Route path="/" exact element={<HomeScreen />} />
        </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
