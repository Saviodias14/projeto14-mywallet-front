import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

export default function TransactionsPage() {
  const navigate = useNavigate()
  const [value, setValue] = useState()
  const [description, setDescription] = useState()
  const { tipo } = useParams()
  const config = { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("autenticacao"))}` } }
  
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("autenticacao"))){
      navigate("/")
    }
  },[])
  function transation(e) {
    e.preventDefault()
    const body = { value, description }
    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`, body, config)
      .then((res) => {
        alert("Transação adicionada com sucesso!")
        navigate("/home")
      })
      .catch((err) => {
        alert(err.response.data)
        if (err.response.status === 401) navigate("/")
      })
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={transation}>
        <input placeholder="Valor" type="text" value={value} onChange={(e) => setValue(e.target.value)} required={true} />
        <input placeholder="Descrição" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required={true} />
        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
