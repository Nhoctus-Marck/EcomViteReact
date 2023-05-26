import Header from "./component/Header"
import { Outlet } from "react-router-dom"
function App() {

  return (
    <div className="">
      <Header/>
      <main className="pt-16">
        <Outlet/>
      </main>
    </div>
  )
}

export default App
