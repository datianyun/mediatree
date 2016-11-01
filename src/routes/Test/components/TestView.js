import React from 'react'

export const Counter = (props) => (
    <div style={{ margin: '0 auto' }} >
        <h2>Counter: {props.counter}</h2>
        <button className='btn btn-default' onClick={props.decrement}>
            Decrement
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.plusAsync}>
            plus (Async)
        </button>
    </div>
)

Counter.propTypes = {
    counter : React.PropTypes.number.isRequired,
    plusAsync : React.PropTypes.func.isRequired,
    decrement : React.PropTypes.func.isRequired
}

export default Counter
