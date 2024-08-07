import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import CourseItem from './components/CourseItem'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItem} />
      <Route path="not-found" component={NotFound} />
      <Redirect to="NotFound" />
    </Switch>
  </>
)

export default App
