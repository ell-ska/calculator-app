import './numpad.scss'

type NumpadProps = {
  onClick: (button: string) => void
}

type CalculatorButtons = {
  character: string
  color?: string
}[]

const buttons: CalculatorButtons = [
  {
    character: 'AC',
    color: 'primary',
  },
  {
    character: '+/-',
    color: 'primary',
  },
  {
    character: '%',
    color: 'primary',
  },
  {
    character: '÷',
    color: 'secondary',
  },
  {
    character: '7',
  },
  {
    character: '8',
  },
  {
    character: '9',
  },
  {
    character: '*',
    color: 'secondary',
  },
  {
    character: '4',
  },
  {
    character: '5',
  },
  {
    character: '6',
  },
  {
    character: '-',
    color: 'secondary',
  },
  {
    character: '1',
  },
  {
    character: '2',
  },
  {
    character: '3',
  },
  {
    character: '+',
    color: 'secondary',
  },
  {
    character: '0',
  },
  {
    character: '.',
  },
  {
    character: '=',
    color: 'secondary',
  },
]

const Numpad = ({ onClick }: NumpadProps) => {
  return (
    <div className='numpad'>
      {buttons.map(({ character, color }) => (
        <button
          key={character}
          onClick={() => onClick(character)}
          className={character === '0' ? 'numpad__button--big' : 'numpad__button'}
          data-color={color}
        >
          {character}
        </button>
      ))}
    </div>
  )
}

export default Numpad
