import './App.css'
import AppRoutes from "./routes/AppRoutes.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";

function App() {

    return (
        <>
            <ModalProvider>
                <AppRoutes/>
            </ModalProvider>
        </>
    )
}

export default App;
