import React, { Component } from 'react';
import './App.css';
import Person from '../src/Person/Person';


class App extends Component {
  state = {
    persons:[
      {id: 'qwer' ,name:'ishaaqh', age:'23'},
      {id: 'qwde' ,name:'arshad', age:'23'},
      {id: 'qwsd' ,name:'dinesh', age:'23'}
    ],
    showPersons: false
  }
  switchNameHandler =(newName) =>{
    this.setState({
      persons:[
        {name: newName, age:'23'},
        {name:'arshad', age:'changed'},
        {name:'changed', age:'23'}
      ]
    })
  }
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      console.log(p.id);
      return p.id ===id;
     
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons:persons})
  }
  togglePersonHandler = () =>{
    const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow})
  }
  deletePersonHandler = (personIndex) =>{
      const persons = [...this.state.persons];
      persons.splice(personIndex,1);
      this.setState({persons: persons});
      console.log(persons);
      console.log(this.state.persons);
  }
  
  render() {
    const style = {
      backgroundColor:'green',
      font: 'inherit',
      border:'1px solid blue',
      padding: '8px',
      
    }
    let persons = null;
    if(this.state.showPersons){
        persons = (
          <div >
            {
              this.state.persons.map((person, index) => {
                return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
              })
            }
         
        </div>
        );
        style.backgroundColor = 'red';
       
    }

    let classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button 
          style={style}
          onClick={this.togglePersonHandler}>Toggle Persons
        </button>
        <div>{persons}</div>           
      </div>
    );
  }
}

export default App;
