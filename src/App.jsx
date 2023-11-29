import { Routes, Route } from "react-router-dom";
import { TodoPage } from "./TodoPage/TodoPage";
import ErrorPage from "./ErrorPage/ErrorPage";
import ProjectPage from "./ProjectPage/ProjectPage";


function App() {

  return (
    
      <Routes>
        <Route path="/" element={<ProjectPage />}/>
        <Route path="*" element={<ErrorPage />}/>
        <Route path="/todos" element={<TodoPage />}>
        </Route>
      </Routes>
   
  );
}

export default App;
