import CartListing from './CartListing';
import { useState } from 'react';
import CheckOut from './CheckOut';

const Header = ({cart, clearCart}) => {

    const [checkWidth, setCheckWidth] = useState(0);

    const checkOut = () => {
        setCheckWidth(100)
    }
    const closeCheckOut = () => {
        setCheckWidth(0)
    }
    let sum = cart.reduce((a, b) => a + (b.price * b.qty), 0);


    return ( 
            <nav className="navbar navbar-expand-lg">
                    <div className="logo"><h1>Arts Shop</h1></div>
                    <div id="navbarText">
                        <button type="button" className="btn" id="cartDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-shopping-cart" />
                            <span className="badge bg-success">
                                {cart.length}
                            </span>
                        </button>
                        <ul className="dropdown-menu cart_menu" aria-labelledby="cartDropDown">
                            
                            { (cart.length > 0 ? cart.map(item => <CartListing key={item.id} item={item}/>) :
                            <li>No item in the cart</li>)}
                            <button onClick={clearCart} className="btn" type="btn">clear</button>
                            <button onClick={checkOut} className="btn" type="btn">Checkout</button>
                        </ul>
                    </div>
                    <div style={{ width: `${checkWidth}vw`}} className="checkout">
                        <span className="closebtn" onClick={closeCheckOut}>&times;</span>
                        <div className="checklisting">
                            <h2>CheckOut</h2>
                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col"></th>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => <CheckOut key={item.id} item={item}/>)}
                            </tbody>
                            <thead>
                                <tr>
                                <th scope="col"></th>
                                <th scope="col"><button onClick={clearCart} className="btn btn-danger">clear</button></th>
                                <th scope="col">
                                    <button className="btn btn-primary">Make Payment</button>
                                </th>
                                <th scope="col">${sum}</th>
                                </tr>
                            </thead>
                            </table>
                        </div> 
                    </div>
            </nav>
     );
}
 
export default Header;