import { useState, useEffect } from 'react'

const Clock = ({ name, timezoneOffset, onDelete }) => {
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  const getTimeForTimezone = () => {
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000)
    return new Date(utc + (3600000 * timezoneOffset))
  }
  
  const localTime = getTimeForTimezone()
  
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
  
  const formatTimezoneOffset = (offset) => {
    if (offset === 0) return 'GMT'
    return `GMT${offset > 0 ? '+' : ''}${offset}`
  }
  
  return (
    <div className="clock-card">
      <button className="delete-btn" onClick={onDelete}>×</button>
      <div className="clock-name">{name}</div>
      <div className="clock-time">{formatTime(localTime)}</div>
      <div className="clock-timezone">{formatTimezoneOffset(timezoneOffset)}</div>
    </div>
  )
}

export default Clock