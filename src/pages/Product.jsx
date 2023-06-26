import {useState, useEffect, useContext } from "react"
import {useParams, Link} from "react-router-dom"
import {Trash, Award} from "react-bootstrap-icons"
import {Container, Row, Col, Table, Card, Button, Form} from "react-bootstrap"
import Rating from "../components/Rating"
import RatingStatic from "../components/RatingStatic"

import Ctx from "../ctx"
import LikeButton from "../components/LikeButton"
import QuantityCounter from "../components/QuantityCounter"
import CardDelivery from "../components/CardDelivery"

const Product = () => {
	const { id } = useParams()
	const { api, userId, isMobile, basket, setBasket, dataConvert, tableInfo} = useContext(Ctx)
	const [data, setData] = useState({})
	const [revText, setRevText] = useState("")
	const [revRating, setRevRating] = useState(0)
	const [hideForm, setHideForm] = useState(true)
	const [showAllReviews, setShowAllReviews] = useState(false)
	const [showCntReviews, setshowCntReviews] = useState((isMobile || window.innerWidth <= 768) ? 2 : 3)
	const [showRatingError, setShowRatingError] = useState(false)
	const [reviews, setReviews] = useState([])

	const prodInBasket = basket.find(el => el.id === id)
	const [cnt, setCount] = useState(0)

	const handleRatingChange = (newRating) => {
		setRevRating(newRating)
	}

	const addReview = (e) => {
        e.preventDefault()
		if (revRating === 0) {
			setShowRatingError(true)
			return
		}
		api.setReview(data._id, {
			text: revText,
			rating: revRating
		}).then(d => {
			setData(d)
			setRevText("")
			setRevRating(0)
			setHideForm(true)
			setReviews(d.reviews)
		})
		.catch(
            setRevText("")
        )
	}

	const delReview = (id) => {
		api.delReview(data._id, id)
			.then(d => {
				const updatedReviews = reviews.filter(review => review._id !== id)
				setData(d)
				setReviews(updatedReviews)
			})
	}

	useEffect(() => {
		api.getSingleProduct(id)
			.then(serverData => {
				setData(serverData)
				setReviews(serverData.reviews)
			})
			.catch(
				setData({})
			)
	}, [api, id])

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setshowCntReviews(2)
			} else {
				setshowCntReviews(3)
			}
		}
		window.addEventListener('resize', handleResize)
	
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const inBasket = basket.filter(el => el.id === id).length > 0

	const addToBasket = !inBasket
        ? (event) => {
            event.preventDefault()
            event.stopPropagation()
			cnt > 1 ? setCount(0) : setCount(1)
            setBasket(prev => [...prev,{
                id,
                price: data.price,
                discount: data.discount,
                cnt: 1
            }])
        }
        : (() => {})

	
	const averageRating = data.name && (
		Math.round(reviews.reduce((acc, el) => acc + el.rating, 0) / reviews.length * 10) / 10
	)

	return  <Container style={{gridTemplateColumns: "1fr"}}>
		<Row className="g-3">
			<Col xs={4} sm={3} lg={2}>
				<Button
					className="w-100 button_navigation rounded-pill"
					as={Link}
					to={`/catalog#pro_${id}`}
				>
					Назад
				</Button>
			</Col>
			{data.name
				? <>
					<Col xs={12}>
						<h1>{data.name}</h1>
					</Col>
					<Row className="d-flex align-items-center justify-content-start ">
						<Col xs={5} sm={3} md={2} style={{minWidth: "100px"}}>
							<RatingStatic rating={averageRating}/>
						</Col>
						<Col xs={7} sm={6} md={5}>
							<a href="#reviews">
								<u>
									Всего отзывов: {reviews.length}
								</u>
							</a>
						</Col>
					</Row>
					<Col xs={12} md={6} className="d-relative p-4">
						{data.discount !== 0 && <>
							<div className="
									ps-2
									pe-2
									m-2
									position-absolute
									rounded-pill
									sale
									bg-danger
									text-white
									border-none
								"
							>
								Скидка {data.discount}%
							</div>
						</>}
						<img src={data.pictures} alt={data.name} className="w-100"/>
					</Col>
					<Col>
						<Row className="mb-2">
							<Col 
								xs={12}
								className={`${data.discount !== 0 
									? "text-secondary fs-5 text-decoration-line-through"
									: "text-dark fw-bold fs-1"}`}
							>
								{data.price} ₽
							</Col>
							{data.discount !== 0 && <>
								<Col xs={12} 
									className={`${data.discount 
										? "text-danger"
										: "text-secondary"} fw-bold fs-1`}
								>
									{Math.ceil(data.price * (100 - data.discount) / 100)} ₽
								</Col>
							</>}
						</Row>
						<Row className="justify-content-between">
							<Col xs={4} sm={4} lg={3} className="d-flex align-items-center">
								<QuantityCounter id={id} data={data}/>
							</Col>
							<Col xs={8} sm={8} lg={9}>
								<Button 
									className="w-100 h-100 button_navigation rounded-pill position-relative"
									onClick={addToBasket}
								>
									{!prodInBasket
										? "Добавить в корзину"
										: <>
											Перейти в корзину
											<Link to={`/basket`} className="card-link"></Link>
										</>}
								</Button>
							</Col>
						</Row>
						<Row className="mb-4 mt-4">
							<Col xs={12}>
								<LikeButton
									likes={data.likes}
									_id={data._id}
									textRight={"В избранное"}
									className="ms-2"
								/>
							</Col>
						</Row>
						<CardDelivery/>
						<Card className="mb-4 p-3 d-flex flex-row rounded-4">
							<Card.Body>
								<Award className="d-flex justify-content-center align-items-center fs-2"/>
							</Card.Body>
							<Card.Body className="w-100">
								<Card.Title className="mb-3">
									Гарантия качества
								</Card.Title>
								<Card.Subtitle className="text-muted" style={{ lineHeight: "1.5" }}>
									Если Вам не понравилось качество нашей продукции, мы вернем деньги или заменим товар.
								</Card.Subtitle>
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12}>
						<h2>Описание</h2>
						<p>{data["description"]}</p>
					</Col>
					<Col xs={12}>
						<h2>Характеристики</h2>
						<Table>
							<tbody>
								{tableInfo.map((el, i) => <tr key={i}>
									<th className="fw-normal text-secondary small w-25">{el.text}</th>
									<td>{el.name === "author"
										? <>
											<span className="me-3">
												{data[el.name].name} ({data[el.name].email})
											</span>
										</>
										: (el.name === "created_at"
											? <>
												<span className="me-3">
													{dataConvert(data.created_at)}
												</span>
											</>
											: data[el.name])
									}</td>
								</tr>)}
							</tbody>
						</Table>
					</Col>
					<h2 id="reviews">Отзывы</h2>
					{!hideForm && <Col xs={12} >
						<h3>Новый отзыв</h3>
						<Form onSubmit={addReview}>
							<Form.Group className="mb-3">
								<Rating
									isAnimationEnabled={false}
									onChange={handleRatingChange}
									onChangeError={setShowRatingError}
								/>
								{showRatingError && <span style={{ color: "red" }}>Пожалуйста, выберите рейтинг</span>}
							</Form.Group>
							<Form.Group  className="mb-3">
								<Form.Label htmlFor="text">Комментарий:</Form.Label>
								<Form.Control
									as="textarea"
									type="text"
									id="text"
									value={revText}
									rows={3}
									onChange={(e) => setRevText(e.target.value)}
								/>
							</Form.Group>
							<Button
								type="reset"
								className="me-2"
								onClick={(e) => {
									e.preventDefault()
									setRevText("")
									setRevRating(0)
									setHideForm(true)
								}}
							>Отмена</Button>
							<Button type="submit">Добавить</Button>
						</Form>
					</Col>}
					{reviews.length > 0 
					? <Col xs={12}>
						<Row className="xs-12 d-flex align-items-stretch pb-4">
							{hideForm && (
								<Col>
									<Button
										variant="outline-info"
										className="fs-7 button_navigation border rounded-pill h-100"
										onClick={() => setHideForm(false)}
									>
										Написать отзыв
									</Button>
								</Col>
							)}
							<Col className="d-flex justify-content-end">
								{showAllReviews
									? <>
										<Button 
											className="fs-7 button_navigation border rounded-pill"
											onClick={() => setShowAllReviews(false)}
										>
											Скрыть все отзывы
										</Button>
									</>
									: <>
										{reviews.length > 3 && <>
											<Button 
												className="fs-7 button_navigation border rounded-pill"
												onClick={() => setShowAllReviews(true)}
											>
												Показать все отзывы
											</Button>
										</>}
									</>
								}
							</Col>
						</Row>
						<Row className="g-3">
							{reviews.slice(0, showAllReviews
								? reviews.length
								: showCntReviews).map(el => <Col xs={6} sm={6} md={4} key={el._id}>
									<Card className="h-100">
										<Card.Body className="position-relative">
											<Row className="d-flex align-items-center justify-content-start">
												<Col xs={4} sm={3} lg={2}>
													<Card.Img
														xs={12} md={3}
														src={el.author.avatar}
														style={{
															width: "40px",
															height: "40px",
															borderRadius: "50%"
														}}
													/>
												</Col>
												<Col xs={12} sm={8} lg={10}>
													<Card.Text>
														{el.author.name}
													</Card.Text>
												</Col>
											</Row>
											<Row>
												<Card.Text className="small text-muted">
													{dataConvert(el.updated_at)}
												</Card.Text>
											</Row>
											<Card.Title>
												<RatingStatic rating={el.rating}/>
											</Card.Title>
											<Card.Text className="fs-6 text-secondary">
												{el.text}
											</Card.Text>
                                            {el.author._id === userId && <>
												<span className="text-danger
																position-absolute
																end-0 bottom-0
																pe-3 pb-2"
												>
													<Trash
														onClick={() => delReview(el._id)}
														className="h-50 w-50 trash cursor-pointer"
													/>
												</span>
											</>}
                                        </Card.Body>
									</Card>
								</Col>
							)}
						</Row>
						
					</Col>
					: hideForm && <Col>
						<Button
	                        className="button_navigation"				
							variant="outline-info"
							onClick={() => setHideForm(false)}
						>
							Написать отзыв
						</Button>
					</Col>
					}
				</>
				: <Col xs={12}>
					<div className="info" style={{textAlign: "center"}}>
						Товара {id} не существует<br/>или<br/>он еще не загружен
					</div>
				</Col>
			}
		</Row>
	</Container>
}

export default Product
