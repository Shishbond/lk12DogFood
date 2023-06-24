import { Pagination as BsPag } from "react-bootstrap"

const Pagination = ({ hk, pageRange}) => {
    const step = (e) => {
        hk.step(+e.target.innerText)
    }

    let items = []
    let i = hk.page - pageRange > 0 ? hk.page - pageRange : 1
    const end = hk.page + pageRange < hk.maxPage ? hk.page + pageRange : hk.maxPage

    if (i !== 1) {
        items.push(
            <BsPag.First
                key="first"
                onClick={() => hk.step(1)}
                className="pagination-custom"
            />
        )
        items.push(
            <BsPag.Prev
                key="prev"
                onClick={() => hk.step(hk.page - 1)}
                className="pagination-custom"
            />
        )
    }

    for (; i <= end; i++) {
        if (i > 0) {
            items.push(
                <BsPag.Item
                    key={i}
                    active={i === hk.page}
                    onClick={i === hk.page ? null : step}
                    className="pagination-custom"
                >
                    {i}
                </BsPag.Item>
            )
        }
    }

    if (end !== hk.maxPage) {
        items.push(
            <BsPag.Next
                key="next"
                onClick={() => hk.step(hk.page + 1)}
                className="pagination-custom"
            />
        )
        items.push(
            <BsPag.Last
                key="last"
                onClick={() => hk.step(hk.maxPage)}
                className="pagination-custom"
            />
        )
    }

    return <BsPag>{items}</BsPag>
}

export default Pagination