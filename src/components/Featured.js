const Featured = ({featured, addCart}) => {

    const featuredProducts = featured.filter(item => item.featured === true);
    let random = Math.floor(Math.random() * featuredProducts.length);
    let productShow = featuredProducts[random];
    

    return ( 
        <>
            <div className="featured">
                <div className="title_top">
                    <h3>{productShow.name}</h3>
                    <button onClick={() => addCart(productShow)} className="btn">Add to Cart</button>
                </div>
                <div className="featuredImage">
                    <div className="featured_box">
                        <img src={productShow.image} alt="" />
                    </div>
                    <div className="featured_title">
                        <p>Photo of the Day</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 detail">
                        <h4>{productShow.name}</h4>
                        <h6>{productShow.category}</h6>
                        <p>{productShow.description}</p>
                    </div>
                    <div className="col-sm-12 col-md-6 related">
                        <h5>People also buy</h5>
                        <div className="box">
                            <img src="http://via.placeholder.com/150-x200" alt=""/>
                            <img src="http://via.placeholder.com/150-x200" alt=""/>
                            <img src="http://via.placeholder.com/150-x200" alt=""/>
                        </div>
                        <h5>Details</h5>
                        <p>Size: 1000 * 1200 pixel</p>
                        <p>Size: 15mb</p>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Featured;