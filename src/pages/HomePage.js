import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import Authorize from "../components/authorize"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const url = "http://localhost:5000"

export default function HomePage() {
  const { token } = useContext(Authorize)
  const [username, setUsername] = useState()
  const [operations, setOperations] = useState([])
  const [total, setTotal] = useState()
  const navigate = useNavigate()
  const config = { headers: { Authorization: `Bearer ${token}` } }
  console.log(operations)
  useEffect(() => {
    axios.get(`${url}/home`, config)
      .then((res) => {
        setUsername(res.data.username)
        setOperations([...res.data.operations])
        let value = 0
        res.data.operations.forEach(element => {
          value += element.value
        });
        setTotal(value)
      })
      .catch(() => {
        navigate("/")
      })
  }, [])
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {username}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {operations.map((o) =>
            <ListItemContainer key={o._id}>
              <div>
                <span>{o.date}</span>
                <strong>{o.description}</strong>
              </div>
              <Value color={o.type === "entrada" ? "positivo" : "negativo"}>{o.value}</Value>
            </ListItemContainer>
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>{total}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={()=>navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={()=>navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  overflow:auto;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`