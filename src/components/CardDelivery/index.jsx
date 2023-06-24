import { useContext } from "react"
import {Card} from "react-bootstrap"
import {Truck} from "react-bootstrap-icons"

import Ctx from "../../ctx"

const CardDelivery = () => {
    const { priceCourierDelivery, priceDeliveryToPoint } = useContext(Ctx)

    return <>
        <Card className="mb-4 p-3 d-flex flex-row rounded-4">
            <Card.Body>
                <Truck className="d-flex justify-content-center align-items-center fs-2 "/>
            </Card.Body>
            <Card.Body className="w-100">
                <Card.Title className="mb-3 ">
                    Доставка по всему Миру!
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                    Доставка курьером - от {priceCourierDelivery}
                </Card.Subtitle>
                <Card.Subtitle className="text-muted">
                    Доставка в пункт выдачи - от {priceDeliveryToPoint}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    </>
}

export default CardDelivery