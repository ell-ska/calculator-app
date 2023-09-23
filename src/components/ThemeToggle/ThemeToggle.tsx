import { type Themes } from '../../App'
import './theme-toggle.scss'

type ThemeToggleProps = {
  onClick: (newTheme: Themes) => void
}

const ThemeToggle = ({ onClick }: ThemeToggleProps) => {
  return (
    <div className='theme-toggle'>
      <button style={{ backgroundColor: '#FFA139' }} onClick={() => onClick('orange')}></button>
      <button style={{ backgroundColor: '#E894B5' }} onClick={() => onClick('pink')}></button>
      <button style={{ backgroundColor: '#76BABD' }} onClick={() => onClick('default')}></button>
    </div>
  )
}

export default ThemeToggle
