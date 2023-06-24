import {useContext, Fragment} from "react"
import {Container, Table, Button, Row, Col} from "react-bootstrap"
import {Link} from "react-router-dom"
import { Trash} from "react-bootstrap-icons"
import Ctx from "../ctx"
import QuantityCounter from "../components/QuantityCounter"
import CardDelivery from "../components/CardDelivery"

const Basket = () => {
    const {basket, setBasket, baseData} = useContext(Ctx)
    const ids = basket.map(b => b.id)
    const filterData = baseData.filter(el=> ids.includes(el._id))

    const sum = basket.reduce((acc, el) => acc + el.price * el.cnt, 0)
    const sumDiscount = basket.reduce((acc, el) => {
        return acc + (el.price * el.cnt * (100 - el.discount) / 100)
    }, 0)

    const del = (id) => {
        setBasket(prev => prev.filter(el => el.id !== id))
    }

    const getWordEnding = (count, word) => {
        const lastDigit = count % 10
        const lastTwoDigits = count % 100

        switch (true) {
            case (lastTwoDigits >= 11 && lastTwoDigits <= 19):
                return `${word}ов`
            case (lastDigit === 1):
                return `${word}`
            case (lastDigit >= 2 && lastDigit <= 4):
                return `${word}а`
            default:
                return `${word}ов`
        }
    }

    return <>
        <Container className="d-block" >
            <Row>
                <h1>Корзина</h1>
            </Row>
            {basket.length > 0
            ? <>
            <Row className="mb-4">
                <Col xs={12} md={8}>
                    <h3>
                        <strong>
                            {basket.length} {getWordEnding(basket.length, "товар")}
                        </strong>&nbsp;в корзине
                    </h3>
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-end">
                    <Button
                        className="button-delete"
                        onClick={() => setBasket([])}
                    >
                        Очистить корзину
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center g-3">
                <Col xs={12} lg={8} style={{ maxHeight: "400px", overflow: "auto" }}>
                    <Table >
                        <tbody>
                            {basket.map(el => filterData.filter(f => f._id === el.id).map(d => <Fragment key={d._id}>
                                    <tr key={`${d._id}basket`}>
                                        <td className="text-center">
                                            <img src={d.pictures} alt={d.name} height="70px"/>
                                        </td>
                                        <td className="align-middle">
                                            <Row className="g-2 ">
                                                <Col xs={12} sm={6} md={6} className="d-flex align-items-center ">
                                                    <Link to={`/product/${el.id}`}>
                                                        {d.name}
                                                    </Link>
                                                </Col>
                                                <Col xs={12} sm={4} md={3}
                                                    className="d-flex align-items-center "
                                                >
                                                    <QuantityCounter id={d._id} data={d} noDelete={true}/>                                                    
                                                </Col>
                                                <Col xs={12} md={3}
                                                    className="d-flex align-items-center justify-content-start order-first order-md-last"
                                                >
                                                        {el.discount > 0 
                                                            ? <>
                                                                <div className="d-flex flex-column">
                                                                    <del className="ms-3 small text-secondary d-inline-block">
                                                                        {el.price * el.cnt} ₽
                                                                    </del>
                                                                    <span className="fs-5 text-danger">
                                                                        {Math.ceil(el.price * el.cnt * ((100 - el.discount) / 100))}  ₽
                                                                    </span>
                                                                </div>
                                                            </>
                                                            : <>
                                                                <span className="fs-5 ">
                                                                    {el.price * el.cnt} ₽
                                                                </span>
                                                            </>
                                                        }
                                                </Col>
                                            </Row>
                                        </td>
                                        <td >
                                            <Trash 
                                                className="trash"
                                                onClick={() => del(el.id)}
                                            />
                                        </td>
                                    </tr>
                                </Fragment>)
                            )}
                        </tbody>
                    </Table>
                </Col>
                <Col md={6} lg={4} >
                    <Row className="ps-3 pe-3 pb-3">
                        <Container className="d-block border rounded-4 ps-4 pe-4 pt-3 pb-3" style={{minWidth: "230px"}}>
                            <Row className="ps-2 fs-4 fw-bold">
                                Ваша корзина
                            </Row>
                            <Row>
                                <Table borderless>
                                    <tbody className="align-middle">
                                        <tr>
                                            <td className="text-secondary">Товары ({basket.length})</td>
                                            <td className="text-end">{sum} ₽</td>
                                        </tr>
                                        {(sumDiscount !== sum) && (
                                            <tr>
                                                <td className="text-secondary">Скидка</td>
                                                <td className="text-danger text-end">{Math.ceil(sumDiscount - sum)} ₽</td>
                                            </tr>
                                        )}
                                        <tr style={{ borderTop: "1px solid lightgray" }}>
                                            <td className="fw-bold">Общая стоимость</td>
                                            <td className="text-end fw-bold fs-5">{Math.ceil(sumDiscount)} ₽</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <button className="button-toCard fw-bold pt-2 pb-2 rounded-pill">Оформить заказ</button>
                            </Row>
                        </Container>
                    </Row>
                    <Row className="ps-3 pe-3">
                        <CardDelivery/>
                    </Row>
                </Col>
            </Row>
            </>
            : <Row className="d-flex align-items-center justify-content-center">
                <Col xs={12} md={6} className="text-center">
                    <span style={{fontSize: "100px"}}>
                    🤔
                    </span>
                    <h5 className="fw-bold">
                        В корзине нет товаров
                    </h5>
                    <p className="fs-6 text-secondary">
                        Чтобы добавить товар, нажмите на значок "корзины" в карточке товара
                    </p>
                    <div className="d-inline-block">
                        <Button
                            className="button-toMain"
                            as={Link}
                            to="/"
                        >
                            На главную
                        </Button>
                    </div>
                </Col>
            </Row>
            }
        </Container>
    </>
}

export default Basket