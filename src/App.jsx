import React from 'react'
import style from './App.module.css'
import Home from './Pages/Home/Home'
import Add from './Pages/Add/Add'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {productReducer} from './store/reducers/product'


const App = () => {
  const store = createStore(productReducer)
  return (
    <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}>
            <Home></Home>
          </Route>
          <Route exact path='/add' component={Add}>
            <Add></Add>
          </Route>
        </Switch>
      </Router>
      </Provider>
    </>
  )
}

export default App
 