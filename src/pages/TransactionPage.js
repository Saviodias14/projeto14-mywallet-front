import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Authorize from "../components/authorize"
import axios from "axios"

const url = "http://localhost:5000"

export default function TransactionsPage() {
  const token = useContext(Authorize)
  const [value, setValue] = useState()
  const [description, setDescription] = useState()
  const {tipo} = useParams()
  console.log(tipo)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  function transation(){
    axios.post(`${url}/nova-transacao/${tipo}`)
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={transation}>
        <input placeholder="Valor" type="text" value={value} onChange={(e)=>setValue(e.target.value)} required={true}/>
        <input placeholder="Descrição" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required={true}/>
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
