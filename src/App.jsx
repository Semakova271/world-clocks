import { useState } from 'react'
import Clock from './components/Clock'
import './App.css'

function App() {
  const [clocks, setClocks] = useState([
    { id: 1, name: 'Нью-Йорк', timezoneOffset: -5 },
    { id: 2, name: 'Лондон', timezoneOffset: 0 },
    { id: 3, name: 'Москва', timezoneOffset: 3 },
    { id: 4, name: 'Токио', timezoneOffset: 9 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newTimezone, setNewTimezone] = useState('')
  const [error, setError] = useState('')
  
  const handleAddClock = () => {
    if (!newName.trim()) {
      setError('Введите название города')
      return
    }
    
    const timezoneNum = parseInt(newTimezone)
    if (isNaN(timezoneNum) || timezoneNum < -12 || timezoneNum > 14) {
      setError('Введите корректное смещение временной зоны (-12 до +14)')
      return
    }
    
    setError('')
    
    const newClock = {
      id: Date.now(),
      name: newName,
      timezoneOffset: timezoneNum
    }
    
    setClocks([...clocks, newClock])
    setNewName('')
    setNewTimezone('')
  }
  
  const handleDeleteClock = (id) => {
    setClocks(clocks.filter(clock => clock.id !== id))
  }
  
  return (
    <div className="container">
      <h1>Мировые часы</h1>
      
      <div className="form-container">
        <input
          type="text"
          placeholder="Название города"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Смещение (например, -5, +3)"
          value={newTimezone}
          onChange={(e) => setNewTimezone(e.target.value)}
          min="-12"
          max="14"
        />
        <button onClick={handleAddClock}>Добавить</button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="clocks-container">
        {clocks.map(clock => (
          <Clock
            key={clock.id}
            name={clock.name}
            timezoneOffset={clock.timezoneOffset}
            onDelete={() => handleDeleteClock(clock.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App