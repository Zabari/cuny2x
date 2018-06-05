import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class ListItem extends React.Component{
  constructor(){
    super();
  }
   render() {
     //console.log(this.props.children[1]);
     if (this.props.finishedItem){
       return (
         <div><li><button onClick={()=>this.props.func(this.props.index)}>Oops put it back!</button>  {this.props.task}  <button onClick={()=>this.props.delFunc(this.props.index)}>Delete forever!</button></li></div>
       );
     }
     if (this.props.starred){
     return(
       <div><li><button onClick={()=>this.props.func(this.props.index)}>Task Finished!</button><b>  {this.props.task}  </b><button onClick={()=>this.props.starFunc(this.props.index)}>Unstar</button></li></div>
     );
     }
     return(
       <div><li><button onClick={()=>this.props.func(this.props.index)}>Task Finished!</button>  {this.props.task}  <button onClick={()=>this.props.starFunc(this.props.index)}>Star</button></li></div>
     );
      }
}
class App extends Component {
    constructor(){
        super();
        this.state={
            task:"",
            listOfTasks: [],
            listOfFinished: []
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.removeItem=this.removeItem.bind(this);
        this.addBack=this.addBack.bind(this);
        this.starItem=this.starItem.bind(this);
        this.deleteForever=this.deleteForever.bind(this);
    }
    starItem(index){
      let updatedListOfTasks=this.state.listOfTasks;
      //let updateFinished=this.state.listOfFinished;
      if (updatedListOfTasks[index].starred){
        updatedListOfTasks[index].starred=0;
      }
      else{
        updatedListOfTasks[index].starred=1;
      }
      this.setState({listOfTasks:updatedListOfTasks});
    }
    deleteForever(index){
      let updateFinished=this.state.listOfFinished;
      updateFinished.splice(index,1)[0];
      this.setState({listOfFinished:updateFinished});
    }
    removeItem(index){
      let updatedListOfTasks=this.state.listOfTasks;
      let updateFinished=this.state.listOfFinished;
      const elem=updatedListOfTasks.splice(index,1)[0];
      updateFinished.push(elem);
      this.setState({listOfTasks:updatedListOfTasks, listOfFinished:updateFinished});
    }
    addBack(index){
      let updatedListOfTasks=this.state.listOfTasks;
      let updateFinished=this.state.listOfFinished;
      const elem=updateFinished.splice(index,1)[0];
      elem.starred=0;
      updatedListOfTasks.push(elem);
      this.setState({listOfTasks:updatedListOfTasks, listOfFinished:updateFinished});
    }
    handleChange(event){
        const task=event.target.value;
        this.setState({task:task});
    }
    handleSubmit(event){
        event.preventDefault();
        const task=this.state.task;
        let updatedListOfTasks=this.state.listOfTasks;
        updatedListOfTasks.push({name:task,starred:0});
        this.setState({listOfTasks:updatedListOfTasks});
        document.getElementById("task").value="";

    }
    render() {
        const listOfTasks=this.state.listOfTasks;
        const listOfFinished=this.state.listOfFinished;
        //console.log(listOfFinished);
        const tasks=listOfTasks.map((task, i) => (<ListItem index={i} func={this.removeItem} task={task.name} starred={task.starred} starFunc={this.starItem} key={i}> </ListItem>));
        const finished=listOfFinished.map((task, i) => (<ListItem index={i} func={this.addBack} finishedItem={1} delFunc={this.deleteForever} task={task.name} starred={task.starred} key={i}> </ListItem>));
        //const finished=0;
        //const tasks=listOfTasks.map((task, i) => (<li key={i}><button onClick={()=>this.removeItem(i)}>Task Finished!</button> {task.name}</li>));
        //const finished=listOfFinished.map((task, i)=> (<li key={i}><button onClick={()=>this.addBack(i)}>Oops put it back!</button> {task.name}</li>));
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">To-Do List</h1>
            </header>
            <p className="App-intro">
              Enter your task below:
            </p>
            <form onSubmit={this.handleSubmit}>
              <label>
                Task:
                <input onChange={this.handleChange} type="text" id="task" />
              </label>
              <input type="submit" value="Submit" />
            </form>
                <h1> Tasks to be done:</h1>
                <ul>
                {(tasks ? tasks : null)}
                </ul>
                <h2> Finished tasks:</h2>
                <ul>
                {(finished ? finished : null)}
                </ul>
          </div>
        );
    }
}

export default App;
