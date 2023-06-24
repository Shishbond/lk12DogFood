import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import BsCard from "../components/BsCard"
import Ctx from "../ctx"
import usePagination from "../hooks/usePagination"
import Pagination from "../components/Pagination"

const maxCardOn = 12

const Catalog = ({ goods, userId }) => {
	const { searchResult, isMobile } = useContext(Ctx)
	const paginate = usePagination(goods, maxCardOn)
	const [pageRange, setPageRange] = useState(isMobile ? 1 : 5)

	useEffect(() => {
		paginate.step(1)
	}, [searchResult])

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768 || isMobile) {
				setPageRange(1)
			} else {
				setPageRange(5)
			}
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [isMobile])

	return (
		<Container className="d-block">
			<Row className="g-4">
				<Col xs={12}>
					<h1>Каталог</h1>
				</Col>
				{searchResult && (
					<Col xs={12} className="search-result">
						{searchResult}
					</Col>
				)}
				{paginate.pageData().map((pro, i) => (
					<Col key={pro._id} xs={12} sm={6} md={4} lg={3}>
						<BsCard img={pro.pictures} {...pro} user={userId} />
					</Col>
				))}
				<Col
					xs={12}
					className="
						text-center
						d-flex
						justify-content-center
						flex-column
						align-items-center
						overflow-hidden
					"
				>
					<Pagination hk={paginate} pageRange={pageRange}/>
				</Col>
			</Row>
		</Container>
	)
}

export default Catalog