import React from 'react'
import './Header.css'

export default function Header({cartToggle,cartLength}) {

    const handleCartToggle = () => {
        cartToggle()
    }

    return (
        <>
        <nav>
            <div className="logo">ASCII FACES</div>
            <div className="nav-menu">
                <div  className="cart-button-div"><button className="cart-button" onClick={handleCartToggle}><i className="fa fa-shopping-cart"></i><span className="counter">{cartLength}</span></button></div>
                <div className="Username">Hi! Mark Harji</div>
            </div>
        </nav>

        <div className="jumbotron">
               <h2 className="title-jumbo">ASCII FACES</h2> 
               <p className="subtitle">You can buy Every ASCII faces you want, Add to Cart Now!</p>
        </div>
        </>
    )
}
