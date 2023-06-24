import { useState, useEffect } from "react"
import { Form, Col, Row } from "react-bootstrap"
import { X, Check, PencilFill } from "react-bootstrap-icons"

const UpdatedInput = ({ val, isActive, upd, changeActive, name }) => {
    const [inp, setInput] = useState(val)

    useEffect(() => {
        setInput(val)
    }, [val])

    return (
        <Row className="w-100">
            {!isActive
                ? <>
                    <Col className={`d-flex fs-5 align-items-center
                        ${name !== "avatar" ? "" : "justify-content-end"}
                    `}>
                        {name !== "avatar" && <div>{val}</div>}
                        <div>
                            <PencilFill className="ms-3 pencil" onClick={() => changeActive(true)}/>
                        </div>
                    </Col>
                </>
                : <>
                    <Col xs={12} sm={8} md={9}>
                        <Form.Control value={inp} onChange={(e) => setInput(e.target.value)}/>
                    </Col>
                    <Col
                        xs={12} sm={4} md={3}
                        className={`d-flex fs-5 align-items-center
                            ${name !== "avatar" ? "justify-content-start" : "justify-content-end"}
                        `}
                    >
                        <X className="me-4 close" onClick={() => changeActive(false)}/>
                        <Check
                            className="check"
                            onClick={() => {
                                changeActive(false)
                                upd(name, inp)
                            }}
                        />
                    </Col>
                </>
            }
        </Row>
    )
}

export default UpdatedInput