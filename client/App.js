import React,{useEffect} from 'react'
import { useDispatch} from 'react-redux'

import Navbar from './components/Navbar'
import Routes from './Routes'
import { fetchProducts } from './store/products'

const App = () => {
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchProducts())
  }) //==ComponentDismount/Update
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
