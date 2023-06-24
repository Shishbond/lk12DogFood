import {Link} from "react-router-dom"
import { useContext } from "react"
import Logo from "./Logo"
import Ctx from "../../ctx"
import {
    Cart4,
    PersonCircle,
    BuildingUp,
    Heart,
    HeartFill

} from "react-bootstrap-icons"

import Search from "../Search"

const Header = ({
        user,
        searchArr,
        setGoods,
        setModalOpen
}) => {

    const {basket, userId, baseData} = useContext(Ctx)

    const login = () => {
        setModalOpen(true)
    }

    const countLike = baseData.reduce((acc, obj) => {
        if (obj.likes.includes(userId)) {
            return acc + 1
    }
        return acc
    }, 0)

    return <header>
        <Logo/>
        <div className="search-block">
            <Search
                data={searchArr}
                setGoods={setGoods}
                user={user}
            />
        </div>
        <nav className="header-menu">
            {user && <>
                <Link to="/favorites" >
                <div className="position-relative">
                    {countLike > 0
                        ? <>
                            <HeartFill title="Избранное"/>
                            <span className="header-badge ">
                                {countLike}
                            </span>
                        </>
                        : <Heart title="Избранное"/>
                    }
                    </div>
                </Link>
                <Link to="/basket" className="header__link">
                    <div className="position-relative">
                    <Cart4 title="Корзина"/>
                        {basket.length > 0 && <>
                            <span className="header-badge">
                                {basket.reduce((acc, el) => acc + el.cnt, 0) }
                            </span>
                        </>}
                    </div>
                </Link>
                <Link to="/profile">
                    <PersonCircle title="Личный кабинет"/>
                </Link>
            </>
            }
            <span>
                {!user && <BuildingUp title="Войти" onClick={login}/>}
            </span>
        </nav>
    </header>
}

export default Header