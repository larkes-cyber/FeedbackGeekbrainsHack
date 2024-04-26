
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../../components/spinner/spinner";
import StudentPage from "../student_page/StudentPage";
import TutorPage from "../tutor_page/TutorPage";
import './app.scss';

function App() {
  return (
    <BrowserRouter>
    <div className="app">
        <main>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path="/student" element={<StudentPage/>}/>
                    <Route path="/tutor" element={<TutorPage/>}/>
                </Routes>
            </Suspense>
        </main>
    </div>
    </BrowserRouter>   
  );
}

export default App;
