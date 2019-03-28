var React = require("react")
var axios = require("axios")


class EditTodo extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeTodoDesc = this.onChangeTodoDesc.bind(this)
    this.onChangeTodoRes = this.onChangeTodoRes.bind(this)
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
    this.onChangeToDoCompleted = this.onChangeToDoCompleted.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    }
  }

  componentDidMount() {
    axios.get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // componentDidUpdate() {
  //   axios.get("http://localhost:4000/todos/" + this.props.match.params.id)
  //     .then(response => {
  //       this.setState({
  //         todo_description: response.data.todo_description,
  //         todo_responsible: response.data.todo_responsible,
  //         todo_priority: response.data.todo_priority,
  //         todo_completed: response.data.todo_completed
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  onChangeTodoDesc(e) {
    this.setState({
      todo_description: e.target.value
    });
  }

  onChangeTodoRes(e) {
    this.setState({
      todo_responsible: e.target.value
    })
  }

  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    })
  }

  onChangeToDoCompleted(e) {
    this.setState({
      todo_completed: !this.state.todo_completed
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    }

    axios.post("http://localhost:4000/todos/update/" + this.props.match.params.id, obj)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))

    this.props.history.push("/");
  }

  render() {
    return(
      <div>
        <h3> Update Todo </h3>
        <form onSubmit = {this.onSubmit}>
          <div className = "form-group">
            <label> Description: </label>
            <input type = "text"
              className="form-control"
              value = {this.state.todo_description}
              onChange = {this.onChangeTodoDesc}
              />
          </div>
          <div className = "form-group">
            <label> Responsible: </label>
            <input type = "text"
              className="form-control"
              value = {this.state.todo_responsible}
              onChange = {this.onChangeTodoRes}
              />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="radio"
                name="priorityOptions"
                id ="priorityLow"
                value = "Low"
                checked = {this.state.todo_priority === "Low"}
                onChange={this.onChangeTodoPriority}
                />
                <label className="form-check-label"> Low </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="radio"
                name="priorityOptions"
                id ="priorityMedium"
                value = "Medium"
                checked = {this.state.todo_priority === "Medium"}
                onChange={this.onChangeTodoPriority}
                />
                <label className="form-check-label"> Medium </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="radio"
                name="priorityOptions"
                id ="priorityHigh"
                value = "High"
                checked = {this.state.todo_priority === "High"}
                onChange={this.onChangeTodoPriority}
                />
                <label className="form-check-label"> High </label>
            </div>
            <div className="form-check">
              <input type = "checkbox"
                className="form-check-input"
                id = "completedCheckbox"
                name = "completedCheckbox"
                onChange={this.onChangeToDoCompleted}
                checked={this.state.todo_completed}
                value= {this.state.todo_completed}/>
                <label className="form-check-label" htmlFor="completedCheckbox">
                  Completed
                </label>
            </div>
            <br/>
            <div className="form-group">
              <input type="submit" value = "Update Todo" className = "btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
      )
  }
}

export default EditTodo