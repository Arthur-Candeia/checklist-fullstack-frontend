import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from "./components/Login/Login";
import Teste from './teste'

export default function RoutesApp() {
  const [user, setUser] = useState()

  function userInfo(data) {
    setUser(data)
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={(props) => <Login {...props} userInfo={userInfo} />}></Route>
        <Route exact path='/login' Component={(props) => <Teste {...props} user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}