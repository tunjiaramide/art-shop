const ProductItem = ({product, addCart}) => {
    let {category, name, price, image, bestseller} = product;
    let defaultImage = 'https://images.pexels.com/photos/1307503/pexels-photo-1307503.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    return ( 
        <div className="col-sm-12 col-md-4">
            <div className="product_box">
                    <div className="img_box">
                        <img src={(image) ? image : defaultImage} alt="#" />
                        <button className="btn overlay" onClick={() => addCart(product)}>Add to Cart</button>
                        { (bestseller) && <div className="best_seller"><span>Best Seller</span></div>}
                    </div> 
                    
                    <p className="product_cat">{category}</p>
                    <h3 className="product_title">{name}</h3>
                    <h6 className="product_price">${price}</h6>
            </div>
        </div>
     );
}
 
export default ProductItem;