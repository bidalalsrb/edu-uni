import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx' // 실제 경로에 맞게

function App() {
    return (
            <RouterProvider router={router}/>
    )
}

export default App;
