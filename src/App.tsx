import { useEffect, useState } from 'react'
import Calculator from './components/Calculator/Calculator'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'

export type Themes = 'default' | 'pink' | 'orange'

const App = () => {
  const [theme, setTheme] = useState<Themes>(() => {
    const localTheme = localStorage.getItem('theme')
    return localTheme ? JSON.parse(localTheme) : 'default'
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  const switchTheme = (newTheme: Themes) => {
    setTheme(newTheme)
  }

  return (
    <div className='app' data-theme={theme}>
      <ThemeToggle onClick={switchTheme} />
      <Calculator />
    </div>
  )
}

export default App
