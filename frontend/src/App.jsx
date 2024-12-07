import { Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Signup } from './pages/signup';
import { Signin } from './pages/sigin';
import DashBoard from './pages/dashboard';
import { SendMoney } from './pages/sendMoney';


function App() {
  return <BrowserRouter>
      <Routes>
          <Route path='/signup' element={<Suspense fallback={"loading....."}><Signup/></Suspense>} />
          <Route path='/signin' element={<Suspense fallback={"loading....."}><Signin/></Suspense>} />
          <Route path='/dashboard' element={<Suspense fallback={"loading....."}><DashBoard/></Suspense>} />
          <Route path='/sendmoney' element={<Suspense fallback={"loading....."}><SendMoney/></Suspense>} />
      </Routes>
  </BrowserRouter>
}

export default App
