import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import FlipMove from 'react-flip-move';

class ListItem extends React.Component{
   render() {
     //console.log(this.props.children[1]);
     if (this.props.finishedItem){
       return (
         <div><li><button onClick={()=>this.props.func(this.props.index)}><s><font color="red">{this.props.task}</font></s></button>    <button onClick={()=>this.props.delFunc(this.props.index)}>Delete forever!</button></li></div>
       );
     }
     if (this.props.starred){
     return(
       <div><li><button onClick={()=>this.props.func(this.props.index)}> <font color="blue"> {this.props.task}</font>  </button><button onClick={()=>this.props.starFunc(this.props.index)}>Unstar</button></li></div>
     );
     }
     return(
       <div><li><button onClick={()=>this.props.func(this.props.index)}>  {this.props.task}</button>  <button onClick={()=>this.props.starFunc(this.props.index)}>Star</button></li></div>
     );
      }
}
class App extends Component {
    constructor(){
        super();
        this.state={
            task:"",
            listOfTasks: [],
            listOfFinished: [],
            saved: 0,
            loaded: 0
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.removeItem=this.removeItem.bind(this);
        this.addBack=this.addBack.bind(this);
        this.starItem=this.starItem.bind(this);
        this.deleteForever=this.deleteForever.bind(this);
        this.saveData=this.saveData.bind(this);
        this.loadData=this.loadData.bind(this);
    }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  //
  //   callApi = async () => {
  //     const response = await fetch('/api/dum');
  //     await console.log(response);
  //     const body = await response.json();
  //
  //     if (response.status !== 200) throw Error(body.message);
  //
  //     return body;
  // };
//   fetch('/api/dum', {
//       headers : {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        }
//
//     })
//     .then((response) => response.json())
//     .then((messages) => {console.log("messages");});
// }
    starItem(index){
      let updatedListOfTasks=this.state.listOfTasks;
      //let updateFinished=this.state.listOfFinished;
      if (updatedListOfTasks[index].starred){
        updatedListOfTasks[index].starred=0;
      }
      else{
        updatedListOfTasks[index].starred=1;
      }
      this.setState({listOfTasks:updatedListOfTasks,saved:0});
    }
    saveData(){
      fetch("/api/save", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
          todo: this.state.listOfTasks,
          finished: this.state.listOfFinished
        })
      })
      .then( (response) => {
        // console.log("made it");

        this.setState({saved:1});
      });
    }
    loadData(){
      fetch("/api/load", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
      })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        this.setState({listOfTasks:JSON.parse(response.items),listOfFinished: JSON.parse(response.finished),loaded:1});
      });
    }
    deleteForever(index){
      let updateFinished=this.state.listOfFinished;
      updateFinished.splice(index,1);
      this.setState({listOfFinished:updateFinished,saved:0});
    }
    removeItem(index){
      let updatedListOfTasks=this.state.listOfTasks;
      let updateFinished=this.state.listOfFinished;
      const elem=updatedListOfTasks.splice(index,1)[0];
      updateFinished.push(elem);
      this.setState({listOfTasks:updatedListOfTasks, listOfFinished:updateFinished,saved:0});
    }
    addBack(index){
      let updatedListOfTasks=this.state.listOfTasks;
      let updateFinished=this.state.listOfFinished;
      const elem=updateFinished.splice(index,1)[0];
      elem.starred=0;
      updatedListOfTasks.push(elem);
      this.setState({listOfTasks:updatedListOfTasks, listOfFinished:updateFinished,saved:0});
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
        this.setState({listOfTasks:updatedListOfTasks,saved:0,loaded:1});
        document.getElementById("task").value="";

    }
    render() {
        const listOfTasks=this.state.listOfTasks;
        const listOfFinished=this.state.listOfFinished;
        //console.log(listOfFinished);
        const tasks=listOfTasks.map((task, i) => (<FlipMove key={i}><ListItem index={i} func={this.removeItem} task={task.name} starred={task.starred} starFunc={this.starItem} key={i}> </ListItem></FlipMove>));
        const finished=listOfFinished.map((task, i) => (<FlipMove key={i}><ListItem index={i} func={this.addBack} finishedItem={1} delFunc={this.deleteForever} task={task.name} starred={task.starred} key={i}> </ListItem></FlipMove>));
        let saved="";
        if (!this.state.loaded){
          saved=(<button onClick={()=>this.loadData()}> Load </button>);
        }
        else{
          if (this.state.saved){
            // console.log("made it");
            saved=(<b>Saved!</b>);
          }
          else{
            saved=(<button onClick={()=>this.saveData()}> Save </button>);
          }
        }
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

                {(finished ? finished : null)}
                </ul>
                {saved}
          </div>
        );
    }
}

export default App;
