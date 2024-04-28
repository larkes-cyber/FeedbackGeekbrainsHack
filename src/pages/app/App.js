
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../../components/spinner/spinner";
import StudentPage from "../student_page/StudentPage";
import TutorPage from "../tutor_page/TutorPage";
import './app.scss';
import RolePage from "../role_page/RolePage";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link,NavLink } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
    <div className="app">

        <main>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path="/student" element={<StudentPage/>}/>
                    <Route path="/tutor" element={<TutorPage/>}/>
                    <Route path="/" element={<RolePage/>} />
                </Routes>
            </Suspense>
        </main>
    </div>
    </BrowserRouter>   
  );
}

export default App;
