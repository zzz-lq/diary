import './App.css';
import { createRoutesFromElements,createBrowserRouter, Route,RouterProvider  } from 'react-router-dom';
import DashBoard from "./component/dashboard/dashboard"
import DiaryDetails from "./component/diary/dirayDetails"
import SignIn from "./component/auth/signin"
import SignUp from "./component/auth/signUp"
import CreateDiary from "./component/diary/createDiary"
import CreateEntry from "./component/entry/createEntry"
import EditEntry from "./component/entry/editEntry"
import EditDiary from "./component/diary/editDiary"
import EntryDetails from "./component/entry/entryDetails"
import Root from './component/root';

function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Root />}
      >
        <Route index path='/' element={<DashBoard/>} />
        <Route exact path='/diary/:did' element={<DiaryDetails/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/create' element={<CreateDiary/>} />
        <Route path='/diary/:did/create' element={<CreateEntry/>} />
        <Route path='/diary/:did/edit' element={<EditDiary/>} />
        <Route path='/diary/:did/:eid/edit' element={<EditEntry/>} />
        <Route path='/diary/:did/:eid' element={<EntryDetails/>} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
