import{useState, useContext, useEffect} from "react"
import { X } from "react-bootstrap-icons"
import {Button} from "react-bootstrap"
import Ctx from "../../ctx"
import "./style.css"

const Modal = ({
    isActive,
    setIsActive,
    setUser
}) => {
    const {api, userNameLS, userIdLS, userTokenLS} = useContext(Ctx)
    const [isReg, setIsReg] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwd2, setPwd2] = useState("")
    const [happenedUse, setHappenedUse] = useState(true)

    const changeForm = (e) => {
        e.preventDefault()
        setIsReg(!isReg)
        clearForm()
    }
    const clearForm = () => {
        setName("")
        setEmail("")
        setPwd("")
        setPwd2("")
    }
    const handleForm = async (e) => {
        e.preventDefault()
        const body = {
            email: email,
            password: pwd
        }
        if(isReg) {
            body.name = name
            body.group = "group-12"
        }

        const data = await (isReg
            ? api.register(body)
            : api.auth(body)
        )

        if (data?.error === "Bad Request" || data.err?.statusCode === (401 || 400)) {
            setHappenedUse(false)
            setTimeout(() => {
                setHappenedUse(true)
            }, 1000)
        }
        
        if(isReg){
            if(data?._id){
                setIsReg(false)
            }
        }else{
            if(data && data.token){
                localStorage.setItem(userTokenLS, data.token)
            }
            if (data && data.data){
                localStorage.setItem(userNameLS, data.data.name)
                setUser(data.data.name)
                localStorage.setItem(userIdLS, data.data._id)
                clearForm()
                setIsActive(false)
            }
        }
    }

    const st = {
        display: isActive ? "flex" : "none"
    }

    useEffect(() => {
        const handleBodyScroll = (e) => {
            if (isActive) {
                document.body.classList.add("modal-open")
            } else {
                document.body.classList.remove("modal-open")
            }
        }
        handleBodyScroll()
    
        return () => {
            document.body.classList.remove("modal-open")
        }
    }, [isActive])

    return <div className="modal-wrapper" style={st}>
        <div className="modal-custom">
                <X
                    className="modal-close"
                    onClick={(e) => setIsActive(false)}
                />
            <h3>{isReg ? "Регистрация" : "Вход"}</h3>
            <form onSubmit={handleForm}>
                {isReg && <input
                    className="input-sign"
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />}
                <input
                    className={`${happenedUse ? "" : "text-danger"} input-sign`}
                    type="email"
                    placeholder="Ваш электронный адрес"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                />
                <input
                    className={`${happenedUse ? "" : "text-danger"} input-sign`}
                    type="password"
                    placeholder="Ваш пароль"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    autoComplete="current-password"
                />
                {isReg && <input
                    className="input-sign"
                    type="password"
                    placeholder="Повторите пароль"
                    value={pwd2}
                    onChange={(e) => setPwd2(e.target.value)}
                />}
                <div className="modal-btns">
                    <Button type="submit" className="me-3 button_navigation rounded-pill" disabled={isReg && (pwd.length < 5 || pwd !== pwd2)}>
                        {isReg ? "Зарегистрироваться" : "Войти"}
                    </Button>
                    <Button className="  button_navigation rounded-pill btn-warning " onClick={changeForm}>
                        {isReg ? "Войти" : "Зарегистрироваться"}
                    </Button>
                </div>
            </form>
        </div>
    </div>
}

export default Modal