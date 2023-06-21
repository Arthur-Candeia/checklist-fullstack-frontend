export async function userLogin(name, password) {
  const headers = new Headers({'Content-Type': 'application/json'})
  let body = JSON.stringify({name, password})
  const result = await fetch('https://checklist-fullstack.vercel.app', {headers, body, method: 'POST'})
  const data = await result.json()
  return data;
}

export async function updateDoneTask(user, index, currentCondition, tdClass, loadPage) {
  const newCondition = currentCondition ? 'false' : 'true'

  document.getElementById(tdClass).classList.toggle('checked')

  await fetch(`https://checklist-fullstack.vercel.app/login/done/${user}/${index}/${newCondition}?_method=put`, {method: 'PUT'})
  loadPage()
}

export async function newTask(user, content, loadPage) {
  await fetch(`https://checklist-fullstack.vercel.app/login/${user}/${content}?_method=post`, {method: 'POST'})
  loadPage()
}

export async function deleteTask(user, index, loadPage) {
  await fetch(`https://checklist-fullstack.vercel.app/login/${user}/${index}?_method=delete`, {method: 'DELETE'})
  loadPage()
}

export async function editTask(user, index, content, loadPage) {
  await fetch(`https://checklist-fullstack.vercel.app/login/${user}/${index}/${content}?_method=put`, {method: 'PUT'})
  loadPage()
}

export async function newUserSave(name, password) {
  const headers = new Headers({'Content-Type': 'application/json'})
  let body = JSON.stringify({name, password})
  const result = await fetch('https://checklist-fullstack.vercel.app/newuser', {headers, body, method: 'POST'})
  const data = await result.json()
  return data;
}