import './App.css'
import { ModalProvider } from "./context/ModalContext.jsx";
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx' // 실제 경로에 맞게

function App() {
    return (
        <ModalProvider>
            <RouterProvider router={router}/>
        </ModalProvider>
    )
}

export default App;
