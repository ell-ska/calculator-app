import { useState } from 'react'
import { math, endsWithSign, sliceAtLastSign } from '../../../utils/utils'
import Result from '../Result/Result'
import Numpad from '../Numpad/Numpad'
import './calculator.scss'

type Calc = {
  sign: string
  number: number | string
  result: number
  previousButton: '=' | '+/-' | null
}

const Calculator = () => {
  const [history, setHistory] = useState('')
  const [calc, setCalc] = useState<Calc>({
    sign: '',
    number: 0,
    result: 0,
    previousButton: null,
  })

  const reset = () => {
    setCalc({
      sign: '',
      number: 0,
      result: 0,
      previousButton: null,
    })
    setHistory('')
  }

  const invert = () => {
    // BUG: if you click multiple times in a row
    const invertedNumber = calc.number ? Number(calc.number) * -1 : 0
    setCalc({
      ...calc,
      number: invertedNumber,
      previousButton: '+/-',
    })

    setHistory(prev => (invertedNumber ? sliceAtLastSign(prev) + invertedNumber.toString() : prev))
  }

  const percent = () => {
    setCalc({
      ...calc,
      number: calc.number ? Number(calc.number) / Math.pow(100, 1) : 0,
      result: calc.result && !calc.number ? Number(calc.result) / Math.pow(100, 1) : 0,
      previousButton: null,
    })
  }

  const comma = () => {
    if (calc.previousButton === '=') {
      setCalc({ ...calc, number: '0.', result: 0, previousButton: null })
      setHistory('0.')
    } else {
      setCalc({
        ...calc,
        number: calc.number.toString().includes('.') ? calc.number : calc.number + '.',
        previousButton: null,
      })
      setHistory(prev => (prev.includes('.') ? prev : `${prev}.`))
    }
  }

  const sign = (clickedSign: string) => {
    setCalc({
      ...calc,
      sign: clickedSign,
      number: 0,
      result:
        !calc.result && calc.number
          ? Number(calc.number)
          : clickedSign === '÷' || clickedSign === '*'
          ? calc.result
          : math(calc.result, Number(calc.number), clickedSign),
      previousButton: null,
    })

    setHistory(prev =>
      endsWithSign(prev) //
        ? prev.slice(0, -1) + clickedSign
        : prev + clickedSign,
    )
  }

  const number = (clickedNumber: string) => {
    if (calc.number.toString().length < 15) {
      if (calc.previousButton === '=') {
        setHistory(clickedNumber)
      } else {
        setHistory(prev =>
          prev === '' && clickedNumber === '0' //
            ? prev
            : prev + clickedNumber,
        )
      }

      setCalc({
        ...calc,
        number:
          calc.number === 0 && clickedNumber === '0' //
            ? 0
            : Number(calc.number.toString() + clickedNumber),
        result: !calc.sign || calc.previousButton === '=' ? 0 : calc.result,
        previousButton: null,
      })
    }
  }

  const equals = () => {
    if (calc.sign && calc.previousButton !== '=') {
      setCalc({
        ...calc,
        result: math(calc.result, Number(calc.number), calc.sign),
        number: 0,
        previousButton: '=',
      })
    }
  }

  const handleNumpadClick = (button: string) => {
    switch (button) {
      case 'AC':
        reset()
        break
      case '+/-':
        invert()
        break
      case '%':
        percent()
        break
      case '=':
        equals()
        break
      case '+':
      case '-':
      case '*':
      case '÷':
        sign(button)
        break
      case '.':
        comma()
        break
      default:
        number(button)
    }
  }

  return (
    <div className='calculator'>
      <Result
        history={history}
        current={calc.number ? calc.number.toString() : calc.result.toString()}
      />
      <Numpad onClick={handleNumpadClick} />
    </div>
  )
}

export default Calculator
