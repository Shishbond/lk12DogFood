import {useState} from "react"

export default (arr, cnt) => {
    const [page, setPage] = useState(1)
    const maxPage = Math.ceil(arr.length / cnt)

    const next = () => {
        let nextPage = Math.min(page + 1, maxPage)
        setPage(nextPage)
    }
    const prev = () => {
        let prevPage = Math.max(page - 1, 1)
        setPage(prevPage)
    }
    const step = (n) => {
        setPage(n)
    }
    const pageData = () => {
        let start = (page - 1) * cnt
        let end = start + cnt
        return arr.slice(start, end)
    }

    return { page, maxPage, next, prev, step, pageData }
}