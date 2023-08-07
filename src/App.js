import logo from './logo.svg';
import './App.css';
import DragAndDropTest from './Page/DragAndDropTest';
import EditDragAndDropTest from './Page/EditDragAndDropTest';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<DragAndDropTest />} />
        <Route path='/edit' element={<EditDragAndDropTest />} />
      </Routes>
    </div>

  )
}

export default App;
