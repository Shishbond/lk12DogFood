import { useContext, useState, useEffect, useRef } from "react"
import "./style.css"
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap"
import { X, Trash, PencilFill } from "react-bootstrap-icons"
import Ctx from "../../ctx"
import {Link} from "react-router-dom"

const ModalMyProduct = ({isButtonOut}) => {
    const { userId, api, setBaseData, dataConvert, baseData, setBasket } = useContext(Ctx)
    const [inputValue, setInputValue] = useState("")
    const [hoveredElement, setHoveredElement] = useState([false,null])
    const [inEdit, setInEdit] = useState(false)
    const [bodyClick, setBodyClick] = useState(null)
    const [tagWord,setTagWord] = useState("")
    const [idProduct, setIdProduct] = useState("")
    const [filteredGoods, setFilteredGoods] = useState(baseData.filter((el) => el.author._id === userId))
    const [searchResults, setSearchResults] = useState([])

    const productCardRef = useRef(null)
    const headerRef = useRef(null)
    const productListRef = useRef(null)

    const recalculateSizes = () => {
        const productCardHeight = productCardRef.current.offsetHeight
        const headerHeight = headerRef.current.offsetHeight
        const productListHeight = productCardHeight - headerHeight - 65

        productListRef.current.style.height = `${productListHeight}px`
    }

    useEffect(() => {
        recalculateSizes()
        window.addEventListener('resize', recalculateSizes)
        return () => {
            window.removeEventListener('resize', recalculateSizes)
        }
    }, [])

    const handleInputChange = (event) => {
        const value = event.target.value
        setInputValue(value)
        if (value.length === 0) {
            setSearchResults([])
        } else {
            const results = filteredGoods.filter(el => el.name.toLowerCase().includes(value.toLowerCase()))
            setSearchResults(results)
        }
    }

    const handleMouseOver = (event, id) => {
        event.stopPropagation()
        setHoveredElement([id, true])
    }

    const handleMouseOut = (event, id) => {
        event.stopPropagation()
        setHoveredElement([id, false])
    }

    const delHandler = (id) => {
        api.delSingleProduct(id)
            .then(data => {
                setFilteredGoods(
                    filteredGoods.map(el => {
                        if (el._id !== data._id) {
                            return el
                        } else {
                            return null
                        }
                    }).filter(el => el !== null)
                )
                if (searchResults.length > 0) {
                    setSearchResults(searchResults.filter((el) => el._id !== id))
                }
                setInputValue("")
                setBaseData(
                    baseData.map(el => {
                        if (el._id !== data._id) {
                            return el
                        } else {
                            return null
                        }
                    }).filter(el => el !== null)
                )
                setBasket((prev) => prev.filter((el) => el.id !== id))
            })
            .catch(
                setBaseData([])
            )
    }

    const clickSetInEdit = (event, idClick="", check=false) => {
        event.stopPropagation()
        setIdProduct(idClick)
        setInEdit(check)
        setBodyClick(filteredGoods.find(el => el._id === idClick))
    }

    const tagsHandler = (e) => {
        const val = e.target.value
        const last = val[val.length - 1]
        setTagWord(val)
        if (/\s/.test(last)) {
            const word = val.slice(0, val.length - 1);
            const isDuplicate = bodyClick.tags?.some(tg => tg.toLowerCase() === word.toLowerCase())
        if (!isDuplicate) {
            setBodyClick({ ...bodyClick, tags: [...bodyClick.tags, word] })
        }
        setTagWord("")
        } else {
            setTagWord(val)
        }
    }

    const delTag = (e) => {
        const val = e.target.innerText
        if (bodyClick && bodyClick.tags) {
            setBodyClick({ ...bodyClick, tags: bodyClick.tags.filter(tg => tg !== val) })
        }
    }

    const editHandler = (e, id) => {
        e.preventDefault()
        const body = {
            name: bodyClick.name,
            price: bodyClick.price,
            discount: bodyClick.discount,
            stock: bodyClick.stock,
            wight: bodyClick.wight,
            description: bodyClick.description,
            pictures: bodyClick.pictures,
            tags: bodyClick.tags
        }
        api.updSingleProduct(id, body)
            .then(data => {
                if (!data.err && !data.error){
                    setFilteredGoods(
                        filteredGoods.map(el => {
                            if(el._id === id){
                                return data
                            }
                            else return el
                        })
                    )
                    setBaseData(
                        baseData.map(el => {
                            if(el._id === id){
                                return data
                            }
                            else return el
                            })
                        )
                    setInEdit(false)
                }
            })
            .catch(
                setBaseData([])
            )
    }

    return <>
        <div className="window-box-products"> 
            <Container
                ref={productCardRef}
                className="my-product-card d-block"
            >
                <X 
                    className="position-absolute top-0 end-0 m-3 fs-3 my-close"
                    onClick={isButtonOut}
                />
                <Row className="my-product-card-header" ref={headerRef}>
                    {filteredGoods.length !== 0
                        ? <Col sm={6} md={5} lg={4}>
                            <h1>Мои товары</h1>
                        </Col>
                        : <Col>
                            <h1>Мои товары</h1>
                        </Col>
                    }
                    {!inEdit
                        ? filteredGoods.length !== 0 && <Col xs={12} md={6} className="ps-3 pe-3" > 
                            <input
                                className="search-my-product"
                                value={inputValue}
                                onChange={handleInputChange}
                                type="search"
                                style={(searchResults.length === 0 && inputValue.length !== 0) ? {color: "red"} : {color: "black"}}
                            />
                        </Col>
                        : <Col className="d-flex justify-content-xs-start justify-content-sm-end align-items-end pe-5">
                            <Button
                                onClick={(event) => clickSetInEdit(event)}
                                className="rounded-pill"
                            >
                                Назад
                            </Button>
                        </Col>
                    }
                </Row>
                
                <Row className="my-product-list" ref={productListRef} >
                    <Container className="scrollable-container d-block pt-3 pb-1">
                        {filteredGoods.length === 0 && <>
                            <div className="justify-content-center align-items-center">
                                    <span className="d-block text-center display-1" >
                                    🤔
                                    </span>
                                    <div>
                                        <h5 className="fw-bold text-center">
                                            Вы пока не добавили свой товар
                                        </h5>
                                        <p className="fs-6 text-secondary text-center">
                                            Добавьте товар, нажав кнопку "Добавить товар"
                                            на странице профиля
                                        </p>
                                    </div>
                            </div>
                        </>}
                        {!inEdit && (searchResults.length > 0 ? searchResults : filteredGoods).map((el) => (
                            <Row
                                key={el._id}
                                className="pt-2 pb-2 pe-0 pl-0 m-0"
                                onMouseOver={(event) => handleMouseOver(event, el._id)}
                                onMouseOut={(event) => handleMouseOut(event, el._id)}
                            >
                                {!inEdit && <>
                                    <Col
                                        xs={12} md={2}
                                        className="d-flex align-items-center justify-content-center"
                                    >
                                        <Col
                                            xs={6} md={12}
                                            style={{ minWidth: "80px", minHeight: "80px"}}
                                        >
                                        <img
                                            src={el.pictures}
                                            className="w-100 h-100"
                                            alt={el.name}
                                        />
                                        </Col>
                                    </Col>
                                    <Col
                                        className="my-product-description"
                                        as={Link} to={`/product/${el._id}`}
                                    >
                                        <span className="name w-auto overflow-hidden text-overflow-ellipsis">
                                            {el.name}
                                        </span>
                                    </Col>
                                    <Col
                                        xs={12} md={2}
                                        className="d-flex align-items-center justify-content-evenly"
                                    >
                                        <span>
                                            <PencilFill
                                                className="button-item__edit"
                                                onClick={(event) => clickSetInEdit(event, el._id, true)}
                                            />
                                        </span>
                                        <span>
                                            <Trash
                                                className="button-item__trash"
                                                onClick={() => delHandler(el._id)}
                                            />
                                        </span>
                                    </Col>
                                </>}
                                {!inEdit && (hoveredElement[1] && (el._id === hoveredElement[0])) && <>
                                    <Col xs={12}>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>Создано</td>
                                                    <td>{dataConvert(el.created_at)}</td>
                                                </tr>
                                                {(el.created_at !== el.updated_at) && <>
                                                    <tr>
                                                        <td>Обновлено</td>
                                                        <td>{dataConvert(el.updated_at)}</td>
                                                    </tr>
                                                </>}
                                                <tr>
                                                    <td>Описание</td>
                                                    <td>{el.description}</td>
                                                </tr>
                                                <tr>
                                                    <td>Скидка</td>
                                                    <td>{el.discount} %</td>
                                                </tr>
                                                <tr>
                                                    <td>Цена</td>
                                                    <td>{el.price} ₽</td>
                                                </tr>
                                                <tr>
                                                    <td>Вес</td>
                                                    <td>{el.wight}</td>
                                                </tr>
                                                <tr>
                                                    <td>Кол-во лайков</td>
                                                    <td>{el.likes.length}</td>
                                                </tr>
                                                <tr>
                                                    <td>Кол-во комментариев</td>
                                                    <td>{el.reviews.length}</td>
                                                </tr>
                                                <tr>
                                                    <td>Теги</td>
                                                    <td>
                                                        {el.tags.map((tag, index) => (
                                                            <span key={index}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </>}
                            </Row>
                        ))}
                        {inEdit && <>
                            <Form onSubmit={(event) => editHandler(event, idProduct)}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-name">
                                                Название товара
                                            </Form.Label>
                                            <Form.Control
                                                id="pro-name"
                                                type="text"
                                                value ={bodyClick.name}
                                                onChange={el => setBodyClick({ ...bodyClick, name: el.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-img">
                                                Ссылка на изображение
                                            </Form.Label>
                                            <Form.Control
                                                id="pro-img"
                                                type="url"
                                                value ={bodyClick.pictures}
                                                onChange={el => setBodyClick({ ...bodyClick, pictures: el.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-price">
                                                Цена товара
                                            </Form.Label>
                                            <Form.Control
                                                id="pro-price"
                                                type="number"
                                                min="10"
                                                max="29990"
                                                value ={bodyClick.price}
                                                onChange={el => setBodyClick({ ...bodyClick, price: el.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-cnt">
                                                Количество на складе
                                            </Form.Label>
                                            <Form.Control
                                                id="pro-cnt"
                                                type="number"
                                                min="0"
                                                max="10000"
                                                value ={bodyClick.stock}
                                                onChange={el => setBodyClick({ ...bodyClick, stock: el.target.value })}                                                />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-w">Вес товара</Form.Label>
                                            <Form.Control
                                                id="pro-w"
                                                type="text"
                                                placeholder="100 гр"
                                                value ={bodyClick.wight}
                                                onChange={el => setBodyClick({ ...bodyClick, wight: el.target.value })}
                                            />
                                            <Form.Text>
                                                Не забудьте прописать единицу измерения вместе с весом
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-disc">
                                                Скидка
                                            </Form.Label>
                                            <Form.Select
                                                id="pro-disc"
                                                type="text"
                                                defaultValue ={bodyClick.discount}
                                                onChange={el => setBodyClick({ ...bodyClick, discount: el.target.value })}
                                            >
                                                <option value={0}>Без скидки</option>
                                                <option value={5}>5%</option>
                                                <option value={10}>10%</option>
                                                <option value={15}>15%</option>
                                                <option value={20}>20%</option>
                                                <option value={25}>25%</option>
                                                <option value={30}>30%</option>
                                                <option value={35}>35%</option>
                                                <option value={40}>40%</option>
                                                <option value={45}>45%</option>
                                                <option value={50}>50%</option>
                                                <option value={55}>55%</option>
                                                <option value={60}>60%</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-info">
                                                Название товара
                                            </Form.Label>
                                            <Form.Control
                                                id="pro-info"
                                                type="text"
                                                value ={bodyClick.description}
                                                as="textarea"
                                                rows={4}
                                                onChange={el => setBodyClick({ ...bodyClick, description: el.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="pro-tag">Теги</Form.Label>
                                            <Form.Control
                                                id="pro-tag"
                                                type="text"
                                                value ={tagWord}
                                                onChange={tagsHandler}
                                            />
                                            <Form.Text
                                                as="div"
                                                className="mt-1 d-flex"
                                                style={{gap: ".25rem"}}
                                            >
                                                {bodyClick.tags?.map(tg=> <Button 
                                                    key={tg}
                                                    variant={tg === "df" ? "warning" : "secondary"}
                                                    disabled={tg === "df"}
                                                    onClick={delTag}
                                                    className="rounded-pill mt-1"
                                                    >
                                                        {tg}
                                                    </Button>
                                                )}
                                            </Form.Text>
                                        </Form.Group>
                                        <Button type="submit" variant="warning" className="rounded-pill mb-3">
                                            Изменить товар
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>}
                    </Container>
                </Row>
                
            </Container>
        </div>
    </>
}

export default ModalMyProduct
