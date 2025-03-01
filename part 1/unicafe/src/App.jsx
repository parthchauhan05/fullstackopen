import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td><td>{value}</td>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tr><StatisticLine text='Good' value={good} /></tr>
        <tr><StatisticLine text='Neutral' value={neutral} /></tr>
        <tr><StatisticLine text='Bad' value={bad} /></tr>
        <tr><StatisticLine text='All' value={good + neutral + bad} /></tr>
        <tr><StatisticLine text='Average' value={(good - bad) / (good + neutral + bad)} /></tr>
        <tr><StatisticLine text='Positive' value={(good / (good + neutral + bad)) * 100} /></tr>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App