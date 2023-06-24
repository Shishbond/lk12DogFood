import {Container, Row, Col} from "react-bootstrap"

const Advertising = ({ proGiftAdv }) => {
    return <>
        <Container className="d-block position-relative border rounded-5 p-5">
            <Row className="align-items-center">
                <Col>
                    <Row className="display-4 custom-text-style">
                        Подарок за первый заказ!
                    </Row>
                    <Row className="fs-3 pt-3">
                        {proGiftAdv.name}
                    </Row>
                </Col>
                <Col xs={6} md={3} lg={3} className="text-center">
                    <img
                        src={proGiftAdv.pictures}
                        alt={proGiftAdv.name}
                        className="img-fluid d-block"
                    />
                </Col>
            </Row>
        </Container>
    </>
}

export default Advertising