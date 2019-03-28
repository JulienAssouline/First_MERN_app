import { Link } from "react-router-dom";
var React = require("react");
var axios = require("axios")

const Todo = props => (
  <tr>
    <td className = {props.todo.todo_completed ? "completed" : ""}> {props.todo.todo_description} </td>
    <td className = {props.todo.todo_completed ? "completed" : ""}> {props.todo.todo_responsible} </td>
    <td className = {props.todo.todo_completed ? "completed" : ""}> {props.todo.todo_priority} </td>
    <td>
      <Link to = {"/edit/" + props.todo._id}> Edit </Link>
     </td>
  </tr>
  )


class TodosList extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
   this._isMounted = true
    axios.get("http://localhost:4000/todos/")
      .then(response => {
        console.log(response)
        if (this._isMounted) {
          this.setState({
            todos: response.data
          })
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  componentDidUpdate() {
    axios.get("http://localhost:4000/todos/")
      .then(response => {
        if (this._isMounted) {
          this.setState({
            todos: response.data
          })
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  componentWillUnmount(){
       this._isMounted = false
  }

  render() {
    return(
      <div>
        <h3> Todos List </h3>
        <table className = "table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th> Description </th>
              <th> Responsibe </th>
              <th> Priority </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.todos.map((current, i) =>
                <Todo todo={current} key = {i} />
              )
            }
          </tbody>
        </table>
      </div>
      )
  }
}

export default TodosList