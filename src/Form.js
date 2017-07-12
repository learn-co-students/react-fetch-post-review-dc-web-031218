import React, { Component } from 'react'

class Form extends Component {

  handleInput = (event) => {
    let name = event.target.name,
        value =  event.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.postCocktail()
  }

  postCocktail = () => {
    fetch('http://localhost:3000/api/v1/cocktails', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {cocktail: this.state} )
      })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p> Cocktail Name: </p>
          <input
          type='text'
          placeholder='cocktail name'
          name='name'
          onChange={this.handleInput}
          />
          <p> Description: </p>
          <input
          type='text'
          placeholder='description'
          name='description'
          onChange={this.handleInput}
          />
          <input
          type='submit'
          className='btn'
          />
        </form>
    </div>
  )
  }
}
export default Form
