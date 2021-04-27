const CartListing = ({item}) => {
    return ( 
        <li>
            <div className="cart_item">
                <div className="cart_title">
                    <h4>{item.name}</h4>
                    <h6>${item.price} <span>x {item.qty}</span></h6>
                </div>
                <div className="cart_img">
                    <img src={item.image} alt="" />
                </div>
            </div>
        </li>
     );
}
 
export default CartListing;