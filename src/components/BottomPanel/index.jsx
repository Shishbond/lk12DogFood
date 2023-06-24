import React from 'react'
import { useEffect } from 'react'
import "./style.css"
import { House, Grid, Cart, Heart, Person } from 'react-bootstrap-icons'
import {Link, useLocation } from "react-router-dom"

const BottomPanel = () => {

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <div className="bottom-panel-container">
            <div className="bottom-panel">
                <Link to="/">
                    <div className="icon">
                        <House size={20} />
                        <span>Главная</span>
                    </div>
                </Link>
                <Link to="/catalog">
                    <div className="icon">
                        <Grid size={20} />
                        <span>Каталог</span>
                    </div>
                </Link>
                <Link to="/basket">
                    <div className="icon">
                        <Cart size={20} />
                        <span>Корзина</span>
                    </div>
                </Link>
                <Link to="/favorites">
                    <div className="icon">
                        <Heart size={20} />
                        <span>Избранное</span>
                    </div>
                </Link>
                <Link to="/profile">
                    <div className="icon">
                        <Person size={20} />
                        <span>Профиль</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BottomPanel