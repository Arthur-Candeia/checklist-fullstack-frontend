import { useEffect, useState } from "react"
import { FaPencilAlt} from 'react-icons/fa'
import {BsTrash3Fill, BsFillSendFill} from 'react-icons/bs'
import { useNavigate } from "react-router-dom"
import { userLogin, updateDoneTask, newTask, deleteTask, editTask } from "../../connect/db"
import './User.scss';

export default function User({user}) {

  const [loginUser, setLoginUser] = useState('')
  const [inputTasks, setInputTasks] = useState('')
  const [itsNew, setItsNew] = useState(true)
  const [positionTask, setPositionTask] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setLoginUser(user.user)
      sessionStorage.data = JSON.stringify(user.user)
    }
    else {
      loadPage()
    }
  }, [])

  function loadPage() {
    try {
      userLogin(sessionStorage.user, sessionStorage.password).then((result) => {
        if (!result.err) {
          setLoginUser(result.user)
        }
      })
    }
    catch {!user && !sessionStorage.data ? navigate('/') : ''}
  }

  async function saveTask(ev) {
    ev.preventDefault()
    setInputTasks('')
    await newTask(loginUser._id, inputTasks, loadPage)
  }

  async function modifyTask(ev) {
    ev.preventDefault()
    await editTask(loginUser._id, positionTask, inputTasks, loadPage)
    setInputTasks('')
    setItsNew(true)
  }


  return (
    <div>
      <h1>{loginUser.name}</h1>
      <table>
        <thead>
          <tr style={{textAlign: 'left', position: 'relative'}}>
            <th colSpan={3}>
              <form onSubmit={itsNew ? (ev) => saveTask(ev) : (ev) => modifyTask(ev)} id="formTask" autoComplete="off">
                <input type="text" name="inputTasks" id="inputTasks" value={inputTasks} onChange={(ev) => setInputTasks(ev.target.value)} placeholder="Adicionar nova tarefa"/>
                <button type="submit" id="submit"><BsFillSendFill /></button>
              </form>
            </th>
          </tr>
          <tr>
            <th>Tarefas</th>
            <th>Estado</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {loginUser?.tasks?.map((element, index) => {
            return (
              <tr key={index}>
                <td className={element.done ? 'content checked' : 'content'}>{element.content}</td>
                <td className="checks">
                  <input type="checkbox" name="check" id={element._id} defaultChecked={loginUser.tasks[index].done} 
                  onClick={() => updateDoneTask(loginUser._id, index, element.done, loadPage)}
                  />
                </td>
                <td className="options">
                  <button className="pencil" onClick={() => {setInputTasks(element.content); setItsNew(false); setPositionTask(index)}}><FaPencilAlt /></button>
                  <button className="trash" onClick={() => {confirm(`Deseja realmente excluir a tarefa ${index}?`) ? deleteTask(loginUser._id, index, loadPage) : ''}}><BsTrash3Fill /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
        </table>
    </div>
  )
}

/*
setLoginUser(JSON.parse(sessionStorage.data))


userLogin(sessionStorage.user, sessionStorage.password).then((result) => {
  setLoginUser(result.user)

  function doneTask(id, index) {
    //updateDoneTask(loginUser._id, element._id, element.done, index)
    updateDoneTask(loginUser._id, id, loginUser.tasks[index].done, index, setLoginUser)
  }
})
*/