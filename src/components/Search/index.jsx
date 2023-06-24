import { useState, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import Ctx from "../../ctx"
import "./style.css"

const Search = (user) => {
    const {setSearchResult, baseData, setGoods} = useContext(Ctx)
    
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [num, setNum] = useState(0)
    
    const changeValue = (e) => {
        navigate("/catalog")
        setText(e.target.value)
    }
    
    useEffect(() => {
        let str = ''
        if(num && text){
            str = `По запросу ${text} найдено ${num} товаров`
        }
        else if (text){
            str = `По запросу ${text} не найдено товаров`
        }
        else{
            str = ''
        }
        setSearchResult(str)
    }, [num, text, setSearchResult])

    useEffect(()=>{
        let result = baseData.filter(el => el.name.includes(text.toLowerCase()))
        setGoods(result)
        setNum(result.length)
    }, [text, baseData, setGoods])

    return <>
        <input className="search" type="search" value={text} onChange={changeValue} disabled={!user.user}/>
    </>
}

export default Search