import Header from "./component/Header"
import { Outlet } from "react-router-dom"
import { Toaster, toast } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Toaster/>
      <div className="">
        <Header/>
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet/>
        </main>
      </div>
    </div>
    
  )
}

export default App
