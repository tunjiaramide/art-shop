const CheckOut = ({item}) => {
    return ( 
        <>
                <tr>
                <th scope="row"><img src={item.image} alt="" /></th>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>${item.price * item.qty} </td>
                </tr>  
        </>
     );
}
 
export default CheckOut;