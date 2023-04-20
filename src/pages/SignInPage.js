import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import Authorize from "../components/authorize"


const url = "http://localhost:5000"

export default function SignInPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const {setToken} = useContext(Authorize)
  const navigate = useNavigate()
  function login(e){
    e.preventDefault()
    axios.post(url, {email, password})
    .then((res)=>{
      setEmail("")
      setPassword("")
      setToken(res.data)
      navigate("/home")
    })
    .catch((err)=>alert(err.response.data))
  }
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required={true}/>
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={(e)=>setPassword(e.target.value)} required={true}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
