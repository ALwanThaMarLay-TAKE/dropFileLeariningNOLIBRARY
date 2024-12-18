
import ColumnContainer from './components/ColumnContainer'
import TaskCreateForm from './components/TaskCreateForm'

const App = () => {
  return (
    <div className='p-10 bg-gray-600 min-h-screen flex flex-col     '>
      <TaskCreateForm />
      <ColumnContainer />
    </div>
  )
}

export default App