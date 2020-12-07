import './App.css';
import Data from './data.json'
import ItemList from './ItemList'
import Header from './Header'
import React, {useState,useEffect } from 'react'
import Modal from 'react-modal'
import CartItem from './CartItem'
import InfiniteScroll from 'react-infinite-scroll-component';



function App() {

  const adsLink = [
    {"link":"./ads/burger.png","content":"Order and Eat Best Burger In Town"},
    {"link":"./ads/clean.jpg","content":"Eat Clean And Healty Food"},
    {"link":"./ads/cocacola.jpg","content":"Break your Thirst with Coca Cola Drink"},
    {"link":"./ads/drink.jpg","content":"Feel Refresh with this Amazing Drink"},
    {"link":"./ads/game.png","content":"Play and Have Fun with This trending game right now"},
    {"link":"./ads/boracay.jpg","content":"Visit the New Clean and Beautiful Boracay"},
    {"link":"./ads/resort.jpg","content":"Your Comfort and Happiness is our Priority"},
    {"link":"./ads/watch.jpg","content":"You know that Time is Gold, Have a Gold Made Watch"},
    {"link":"./ads/japan.jpg","content":"Visit the most famous country in Asia"},
    {"link":"./ads/pizza.jpg","content":"Pizza guys, You want? Affordable Price"},]

  const [items , setItems] = useState([])
  const [sortBy, setSortBy] = useState("Name")
  const [sortOrder,setSortOrder] = useState("Descending")
  const [hasMore, setHasMore] = useState(true)
  const [currentValue, setCurrentValue] = useState(20)
  const [cart,setCart] = useState([])
  const [cartIsOpen , setCartIsOpen] = useState(false)
  const [addIsActivated,setAddIsActivated] = useState(false)
  const [prevAds , setPrevAds]  = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [checkOutItems,setCheckOutItems] = useState(false)
  const [startLoading,setStartLoading] = useState(true)

  let sortedData = []
  const currentData = [...Data]


  const sortData = e =>{
    let sortTarget = e.target.value
    setSortBy(sortTarget)
  }

  const sortDataOrder = e =>{
    let sortTargetOrger = e.target.value
    setSortOrder(sortTargetOrger)
  }

  const clearCart = () =>{
    setCart([])
    setCheckOutItems(true)
  }


  useEffect(()=>{ 
    if(sortBy === "Price"){
      if(sortOrder === "Ascending"){
       sortedData = currentData.sort( (a,b) => {
        return parseFloat(a.price) - parseFloat(b.price)
      }) }else{
        sortedData = currentData.sort( (a,b) => {
          return parseFloat(b.price) - parseFloat(a.price)
        })
      }
    }else if(sortBy === "Size"){
      if(sortOrder === "Ascending"){
      sortedData = currentData.sort( (a,b) => {
       return parseFloat(a.size) - parseFloat(b.size)
     })}else{
      sortedData = currentData.sort( (a,b) => {
        return parseFloat(b.size) - parseFloat(a.size)
      })
     }
   }else if(sortBy === "Name"){
      if(sortOrder === "Ascending"){
       sortedData = currentData.sort( (a,b) => {
       if(a.name > b.name){
         return 1;
       }else if(a.name < b.name){
         return -1;
       }else{
         return 0;
       }
      })}else{
        sortedData = currentData.sort( (a,b) => {
          if(b.name > a.name){
            return 1;
          }else if(b.name < a.name){
            return -1;
          }else{
            return 0;
          }
         })
      }
    }else if(sortBy === "Date"){
      if(sortOrder === "Ascending"){
       sortedData = currentData.sort( (a,b) => {
        return new Date(a.submitDate).valueOf() - new Date(b.submitDate).valueOf()
       })}else{
        sortedData = currentData.sort( (a,b) => {
          return new Date(b.submitDate).valueOf() - new Date(a.submitDate).valueOf()
         })
       }
    }
    setItems(sortedData)
  },[])


  useEffect(()=>{
    if(sortBy === "Price"){
      if(sortOrder === "Ascending"){
       sortedData = currentData.sort( (a,b) => {
        return parseFloat(a.price) - parseFloat(b.price)
      }) }else{
      
        sortedData = currentData.sort( (a,b) => {
          return parseFloat(b.price) - parseFloat(a.price)
        })
      }
    }else if(sortBy === "Size"){
      if(sortOrder === "Ascending"){
      sortedData = currentData.sort( (a,b) => {
       return parseFloat(a.size) - parseFloat(b.size)
     })}else{
      sortedData = currentData.sort( (a,b) => {
        return parseFloat(b.size) - parseFloat(a.size)
      })
     }
   }else if(sortBy === "Name"){
      if(sortOrder === "Ascending"){
       sortedData = currentData.sort( (a,b) => {
       if(a.name > b.name){
         return 1;
       }else if(a.name < b.name){
         return -1;
       }else{
         return 0;
       }
      })}else{
        sortedData = currentData.sort( (a,b) => {
          if(b.name > a.name){
            return 1;
          }else if(b.name < a.name){
            return -1;
          }else{
            return 0;
          }
         })
      }
    }else if(sortBy === "Date"){
      if(sortOrder === "Ascending"){
       sortedData = currentData.sort( (a,b) => {
        return new Date(a.submitDate).valueOf() - new Date(b.submitDate).valueOf()
       })}else{
        sortedData = currentData.sort( (a,b) => {
          return new Date(b.submitDate).valueOf() - new Date(a.submitDate).valueOf()
         })
       }
    }
    setItems(sortedData)
  },[sortBy,sortOrder])


  useEffect(()=>{
    const tempCart = [...cart]
    const arrSum = tempCart.reduce((a,b) => a + b.price, 0)
    setTotalPrice(arrSum)
  },[])


  useEffect(()=>{
    const tempCart = [...cart]
    const arrSum = tempCart.reduce((a,b) => a + b.price, 0)
    setTotalPrice(arrSum)
    if(tempCart.length !== 0){
      setCheckOutItems(false)
    }
  },[cart])


  const addToCart = (item) =>{
   setCart(prevCart => {
     return [...prevCart,item]
   })
  }

  const cartToggle = () => {
    setCartIsOpen(prevValues => !prevValues)
  }

  const adsIsOpenToggle = () => {
    setAddIsActivated(prevValues => !prevValues)
  }


  const fetchMore = () =>{
    if((items.length -  currentValue) > 20){ // 45 - 20 = 5
      setCurrentValue(preValue => preValue + 20)
    }else if((items.length -  currentValue) < 20 && (items.length -  currentValue) >= 0){
      setCurrentValue(prevValue => items.length)
      setHasMore(false)
    } 
    return
  }


  useEffect(() => {
    let randValue = 0
    while(randValue === prevAds){
      randValue = Math.floor((Math.random() * 10) )
    }
    setPrevAds(randValue)
    setAddIsActivated(true)
  },[currentValue])


  const removeCartItem = (data) => {
    const tempCart = [...cart]
    const tempCart2 = tempCart.filter(tempCartItem => tempCartItem.face !== data.face)
    setCart([...tempCart2])
  }

  if(startLoading){
    setTimeout(()=>{
      setStartLoading(false)
    },3000)
    return (<><div className="loader">Loading...</div></>)
  }

  if(!startLoading){
  return (
    <>
        <Header  cartToggle={cartToggle} cartLength={cart.length}/>
        <Modal isOpen={cartIsOpen} ariaHideApp={false} onRequestClose={()=>setCartIsOpen(false)} 
          style={{
            overlay: {
              backgroundColor:'rgba(0, 0, 0, 0.3)'
            },
            content:{
              width:'60vw',
              top: '50%',
              left: '50%',
             height:'80%',
              transform: 'translate(-50%, -50%)',
              paddingTop:'5px',
              marginTop:'0',
            }
          }}
        >
          <div className="modal-title">
            <h2>Your Cart ( {cart.length} Item/s )</h2>
            <button className="exit-button" onClick={cartToggle}>X</button>
          </div><hr></hr>
          <div className="cart-list">
              {cart.map((cartItem,index) => {
                return <CartItem cartItem={cartItem} key={index} removeCartItem={removeCartItem}/>
              })}
          </div>
          <div className="total-price">
            <div>
            Total Price
            </div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className="check-btn">
              <button className="check-outbtn" onClick={clearCart}>Checkout</button>
          </div>
          {checkOutItems && <div className="bought">YOU HAVE BOUGHT SUCCESSFULLY</div>}
        </Modal>


        <Modal isOpen={addIsActivated} ariaHideApp={false}  
          style={{
            
            overlay: {
              backgroundColor:'rgba(0, 0, 0, 0.3)'
            },
            content:{
              width:'45vw',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              height:'60%',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              paddingTop:'5px',
              marginTop:'0',
            }
          }}
        >
   
        <div className="modal-title">
            <h2 className="title-ads">Commercial Ads</h2>
            <button className="exit-button" onClick={adsIsOpenToggle}>X</button>
          </div>
          <div className="ads-body">
            <img className="ads-image" src={adsLink[prevAds].link}/>
            <p  className="ads-image"> {adsLink[prevAds].content}</p>
          </div>
   
          
          
        </Modal>

        
        <div className="sort-items"> 
                <select className="sort-select sort-by" defaultValue={"Name"} onChange={e => sortData(e)}>
                  <option value="Date">Sort By Date</option>
                  <option value="Name">Sort By Name</option>
                  <option value="Price">Sort By Price</option>
                  <option value="Size">Sort By Size</option>
                </select>
                <select className="sort-select sort-order" defaultValue={sortOrder} onChange ={e => sortDataOrder(e)} >
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>
        </div>
        <hr></hr>
        <div className="items-list">
          <InfiniteScroll
            dataLength={currentValue}
            next={fetchMore}
            hasMore={hasMore}
            loader={<><br></br><h4>Loading...</h4></>}
            className="items-list"
            >
              <ItemList items = {items.slice(0,currentValue)} addToCart= {addToCart} cart = {cart}/>
          </InfiniteScroll>
        </div>
        <div className="loading-next-data">{!hasMore && 'End of Catalogue'}<hr></hr></div>
      
    </>
    
   );
}}
export default App;
