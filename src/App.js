import { useState, useEffect } from 'react';
import Header from './components/Header';
import Featured from './components/Featured';
import Content from './components/Content';
import Loading from './components/Loading';


const App = () => {
  const [fetchData, setFetchData] = useState();
  const [featuredData, setFeaturedData] = useState();
  const [loadingData, setLoadingData] = useState(false);
  const [cart, setCart] = useState([]);

  const fectchProductsAPI = async () => {
    let url = 'https://light-salmon-80.hasura.app/api/rest/products';
    const response = await fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
          'x-hasura-admin-secret': process.env.REACT_APP_API_KEY, 
          'Content-Type': 'application/json'
    }});
    const data = await response.json();
    setFeaturedData(data.products);
    setFetchData(data.products);
    setLoadingData(true);
  }

  useEffect(() => {
    fectchProductsAPI()
  }, [])
  

  const addCart = (product) => {
    let newCart = [...cart];
    let existingProduct = newCart.filter(item => item.id === product.id);
    if(existingProduct.length === 0) {
      newCart.push({
        name: product.name,
        qty: 1,
        price: product.price,
        image: product.image,
        id: product.id 
      });
    } else {
      let position = newCart.findIndex(item => item.id === existingProduct[0].id);
      newCart[position].qty++
    }
    setCart(newCart);
  }


  const clearCart = () => {
    console.log('cart cleared')
    setCart([]);
  }

  const priceFilter = (e) => {
    let name = e.value;
    let priceData;
    if(name === '20') {
      let newData = [...featuredData];
      priceData = newData.filter(item => item.price <= '20')
      setFetchData(priceData);
    }
    if(name === '100') {
      let newData = [...featuredData];
      priceData = newData.filter(item => (item.price > '20' & item.price <= '100'))
      setFetchData(priceData);
    }
    if(name === '200') {
      let newData = [...featuredData];
      priceData = newData.filter(item => (item.price > '100' & item.price <= '200'))
      setFetchData(priceData);
    }

    if(name === '201') {
      let newData = [...featuredData];
      priceData = newData.filter(item => item.price > '200')
      setFetchData(priceData);
    }
  }

  const filterByCategory = (data) => {
    if (typeof(data) === 'undefined') return setFetchData(featuredData);
    let keys = Object.keys(data)
    let filtered = keys.filter(key => data[key])
    if (filtered.length === 0) return setFetchData(featuredData);
    let newData = [...featuredData]
    let catData = newData.filter(item => filtered.includes(item.category));
    setFetchData(catData);
  }


  const sortAscending = () => {
    let newData = [...fetchData];
    return newData.sort((a, b) => a.name.localeCompare(b.name));
  }

  const sortDescending = () => {
    let newData = [...fetchData];
    return newData.sort((a, b) => b.name.localeCompare(a.name));
  }

  const sortLowest = () => {
    let newData = [...fetchData];
    return newData.sort((a, b) => a.price - b.price);
  }

  const sortHighest = () => {
    let newData = [...fetchData];
    return newData.sort((a, b) => b.price - a.price);
  }

  const sortedData = (e) => {
    if(e.target.value === 'asc') {
      setFetchData(sortAscending())
    }
    if(e.target.value === 'desc') {
      setFetchData(sortDescending())
    }
    if(e.target.value === 'low') {
      setFetchData(sortLowest())
    }
    if(e.target.value === 'high') {
      setFetchData(sortHighest())
    }
  }
  
  
  return (
    <>
      <div className="container">
        <Header cart={cart} clearCart={clearCart}/>
        {(loadingData) ? <Featured addCart={addCart} featured={featuredData}/> : <Loading />}
        {(loadingData) ? 
        <Content 
          priceFilter={priceFilter} 
          addCart={addCart} 
          sortedData={sortedData} 
          products={fetchData}
          filterByCategory={filterByCategory}
          unFilteredData={featuredData}
          /> : <Loading />
        }
      </div>
    </> 
  );
}

export default App;
