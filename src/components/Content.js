import ProductItem from './ProductItem';
import { useState } from 'react';

const Content = ({ unFilteredData, products, sortedData, addCart, priceFilter, filterByCategory}) => {
    const uniqueCategory = [...new Set(unFilteredData.map(item => item.category))];
    const [catFilter, setCatFilter] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(6);
    const [filterWidth, setFilterWidth] = useState(0);


    let indexLastProduct = currentPage * perPage;
    let indexFirstProduct = indexLastProduct - perPage;
    let currentProducts = products.slice(indexFirstProduct, indexLastProduct);

    const changeCurrentPage = (num) => {
        console.log(num);
        setCurrentPage(num)
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / perPage); i++) {
        pageNumbers.push(i);
    }

    const prevProducts = () => {
        setCurrentPage(prevState => prevState - 1);
    }

    const nextProducts = () => {
        setCurrentPage(prevState => prevState + 1);
    }

    const openNav = () => {
        setFilterWidth(250)
    }

    const closeNav = () => {
        setFilterWidth(0)
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li 
            className="page-item"
            key={number}
            id={number}
            onClick={() => changeCurrentPage(number)}
            >
                <button className="page-link">{number}</button>
            </li>
        )
    });

    
    const getCat = (e) => {
        let isChecked = e.checked;
        let name = e.name;
        setCatFilter((prevState) => ({...prevState, [name]: isChecked}))
    }

    const refreshPage = () => {
        window.location.reload();
    }

    

    return ( 
        <div className="content">
            <div className="top">
                <div className="title">
                    <h4>Photography / <span>Premium Photos</span></h4>
                </div>
                <div className="filter_top">
                    <div className="sortby">
                    <label>Sort By: </label>
                    <select onChange={sortedData} name="sortby">
                        <option value="">Select</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                        <option value="low">Lowest to Highest</option>
                        <option value="high">Highest to Lowest</option>
                    </select>
                    </div>
                    <div className="mobile_filter">
                        <span style={{fontSize:16, cursor:'pointer'}} onClick={openNav}>&#9779; open</span>
                    </div>
                </div>
            </div>
            <div id="mySidenav" className="mobileContent" style={{ width: filterWidth}}>
                <span className="closebtn" onClick={closeNav}>&times;</span>
                <div className="catfilter">
                        <h5>Category</h5>
                        {uniqueCategory.map((productCat) => (
                            <div key={productCat}>
                                <input type="checkbox" 
                                name={productCat}
                                onChange={(e) => getCat(e.target)}
                                />
                                <label>{productCat}</label>
                            </div>
                        ))}
                </div>
                <div className="pricefilter">
                        <h5>Price Range</h5>
                        <div onChange={(e) => priceFilter(e.target)} >
                            <div>
                                <input type="radio" value="20" name="price" /> Lower than $20
                            </div>
                            <div>
                                <input type="radio" value="100" name="price" /> $20 - $100
                            </div>
                            <div>
                                <input type="radio" value="200" name="price" /> $100 - $200
                            </div>
                            <div>
                                <input type="radio" value="201" name="price" /> More than $200
                            </div>
                        </div>
                </div>
                <button onClick={refreshPage} className="btn btn-danger">Clear</button>
                <button 
                        onClick={() => filterByCategory(catFilter)}
                        className="btn btn-primary">Filter</button>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-3 mb-5 mobile_off">
                    <div className="catfilter">
                        <h5>Category</h5>
                        {uniqueCategory.map((productCat) => (
                            <div key={productCat}>
                                <input type="checkbox" 
                                name={productCat}
                                onChange={(e) => getCat(e.target)}
                                />
                                <label>{productCat}</label>
                            </div>
                        ))}
                        <button 
                        onClick={() => filterByCategory(catFilter)}
                        className="btn btn-primary">Filter</button>
                    </div>
                    <div className="pricefilter">
                        <h5>Price Range</h5>
                        <div onChange={(e) => priceFilter(e.target)} >
                            <div>
                                <input type="radio" value="20" name="price" /> Lower than $20
                            </div>
                            <div>
                                <input type="radio" value="100" name="price" /> $20 - $100
                            </div>
                            <div>
                                <input type="radio" value="200" name="price" /> $100 - $200
                            </div>
                            <div>
                                <input type="radio" value="201" name="price" /> More than $200
                            </div>
                          
                        </div>
                    </div>
                    <button onClick={refreshPage} className="btn btn-danger">Reset All</button>
                </div>
                <div className="col-sm-12 col-md-9">
                    <div className="products">
                        <div className="row">
                            { currentProducts.map(product => <ProductItem key={product.id} addCart={addCart} product={product}/>) }
                        </div>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                           {(indexFirstProduct > 0) && <button onClick={prevProducts} className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>}
                            </li>
                            {renderPageNumbers}
                            <li className="page-item">
                            {(indexLastProduct < products.length) && <button onClick={nextProducts} className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            
            
        </div>
     );
}
 
export default Content;