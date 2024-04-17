'use client'
import React, { useState } from 'react'

const StringInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [stringsArray, setStringsArray] = useState<string[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleAddString = () => {
    if (inputValue.trim() !== '') {
      setStringsArray(prevState => [...prevState, inputValue])
      setInputValue('')
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddString()
    }
  }

  const handleDeleteString = (index: number) => {
    setStringsArray(prevState => prevState.filter((_, i) => i !== index))
  }

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='Enter a string'
      />
      <button onClick={handleAddString}>Add String</button>
      <ul>
        {stringsArray.map((str, index) => (
          <li key={index}>
            {str}
            <button onClick={() => handleDeleteString(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StringInput
