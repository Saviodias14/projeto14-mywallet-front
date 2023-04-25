import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react"
import axios from "axios"

export default function SignInPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("autenticacao")){
      console.log(localStorage.getItem("autenticacao"))
      navigate("/home")
    }
  },[])
  function login(e){
    e.preventDefault()
    axios.post(process.env.REACT_APP_API_URL, {email, password})
    .then((res)=>{
      setEmail("")
      setPassword("")
      localStorage.setItem("autenticacao", JSON.stringify(res.data))
      navigate("/home")
    })
    .catch((err)=>console.log(err))
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
