import './result.scss'

type ResultProps = {
  history: string
  current: string
}

const Result = ({ history, current }: ResultProps) => {
  return (
    <div className='result'>
      <div className='result__cutout' />
      <h3 className='result__history'>{history}</h3>
      <h2 className='result__current'>{current}</h2>
    </div>
  )
}

export default Result
