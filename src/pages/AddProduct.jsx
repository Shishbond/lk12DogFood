
import {useState, useContext} from "react"
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import Ctx from "../ctx"

const AddProduct = () => {
    const navigate = useNavigate()
    const {api, setBaseData, baseData} = useContext(Ctx)
    const [name, setName] = useState("ЕДА")
    const [link, setLink] = useState("https://avatars.mds.yandex.net/i?id=f7a48f57630c151267b7833893a9c1daf37694ee-8334793-images-thumbs&n=13")
    const [price, setPrice] = useState(100)
    const [cnt, setCnt] = useState(1)
    const [description, setDescription] = useState("ОПИСАНИЕ")
    const [discount,setDiscount] = useState(0)
    const [wight,setWight] = useState("0 гр")
    const [tagWord,setTagWord] = useState("")
    const [tags, setTags] = useState(["dogfood"])

    const tagsHandler = (e) => {
        const val = e.target.value
        const last = val[val.length-1]
        setTagWord(val)
        if(/\s/.test(last)){
            const word = val.slice(0, val.length - 1)
            const test = tags.filter(tg => tg.toLowerCase() === word.toLowerCase())
            if(!test.length){
                setTags(prev => [...prev, word])
            }
            setTagWord("")
        }
        else{
            setTagWord(val)
        }
    }
    const clearForm = () => {
        setName("ЕДА")
        setLink("https://avatars.mds.yandex.net/i?id=f7a48f57630c151267b7833893a9c1daf37694ee-8334793-images-thumbs&n=13")
        setPrice(100)
        setCnt()
        setWight("0 гр")
        setDiscount(0)
        setDescription("ОПИСАНИЕ")
        setTagWord("")
        setTags(["dogfood"])
    }
    const delTag = (e) => {
        const val = e.target.innerText
        setTags(prev => prev.filter(tg => tg !== val))
    }
    const formHandler = (e) => {
        e.preventDefault()
        const body = {
            name: name,
            price: price,
            discount: discount,
            stock: cnt,
            wight: wight,
            description: description,
            pictures: link,
            tags: tagWord && !tags.includes(tagWord) ? [...tags, tagWord] : tags
        }
        api.addProduct(body)
            .then(data => {
                if (!data.err && !data.error){
                    clearForm()
                    navigate(`/product/${data._id}`)
                    
                    setBaseData([...baseData, data])

                }
            }
        )
        .catch(
            setBaseData([])
        )
    }

    return <Container style={{gridTemplateColumns: "auto"}}>
        <Row>
            <Col xs={12}><h1>Добавить новый товар</h1></Col>
            <Col>
                <Button
					className="rounded-pill button_navigation mb-3 mt-1 ps-5 pe-5"
					as={Link}
					to="/profile"
				>
                    Назад
                </Button>
            </Col>
            <Form onSubmit={formHandler}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-name">Название товара</Form.Label>
                            <Form.Control
                                id="pro-name"
                                type="text"
                                value ={name}
                                onChange={e => {setName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-img">Ссылка на изображение</Form.Label>
                            <Form.Control
                                id="pro-img"
                                type="url"
                                value ={link}
                                onChange={e => {setLink(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-price">Цена товара</Form.Label>
                            <Form.Control
                                id="pro-price"
                                type="number"
                                value ={price}
                                // step="10"
                                min="10"
                                max="29990"
                                onChange={e => {setPrice(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-cnt">Количество на складе</Form.Label>
                            <Form.Control
                                id="pro-cnt"
                                type="number"
                                value ={cnt}
                                min="0"
                                max="10000"
                                onChange={e => {setCnt(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-w">Вес товара</Form.Label>
                            <Form.Control
                                id="pro-w"
                                type="text"
                                value ={wight}
                                placeholder="100 гр"
                                onChange={e => {setWight(e.target.value)}}/>
                                <Form.Text>Пропишите вес и единицу измерения</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-disc">Скидка</Form.Label>
                            <Form.Select
                                id="pro-disc"
                                type="text"
                                defaultValue ={discount}
                                onChange={e => {setDiscount(e.target.value)}}>
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
                            <Form.Label htmlFor="pro-info">Описание товара</Form.Label>
                            <Form.Control
                                id="pro-info"
                                type="text"
                                value ={description}
                                as="textarea"
                                rows={4}
                                onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-tag">Добавить теги</Form.Label>
                            <Form.Control
                                id="pro-tag"
                                type="text"
                                value ={tagWord}
                                onChange={tagsHandler}/>
                            <Form.Text as="div" className="mt-1 d-flex" style={{gap: ".25rem"}}>
                                {tags.map(tg=> <Button 
                                    key={tg}
                                    variant={tg === "df" ? "warning" : "secondary"}
                                    className="rounded-pill mt-1"
                                    disabled={tg === "df"}
                                    onClick={delTag}
                                >
                                    {tg}
                                </Button>)}
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit" className="button_navigation rounded-pill">Добавить товар</Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    </Container>
}

export default AddProduct