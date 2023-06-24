import {Container, Row, Col} from "react-bootstrap"

const ProductAdvertising = ({proAdv}) => {
    return <>
        <Container className="d-flex position-relative border rounded-5 p-0 h-100">
            <Row className="d-flex align-items-stretch m-3 justify-content-center">
                <Col xs={8} sm={5} md={4} className="d-flex align-items-center justify-content-center">
                    <img
                        src={proAdv.pictures}
                        alt={proAdv.name}
                        className="d-block img-fluid "
                    />
                </Col>
                <Col xs={12} sm={7} md={8}>
                    <Row className="fs-3 text-primary">
                        {proAdv.name}
                    </Row>
                    <Row className="fs-4 pt-3">
                        {proAdv.caption}
                    </Row>
                </Col>
            </Row>
        </Container>
    </>
}

export default ProductAdvertising