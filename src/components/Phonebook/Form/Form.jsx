import { Component } from 'react';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleClickName = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };
  // handleClickNumber = ({ target }) => {
  //   this.setState({
  //     number: target.value,
  //   });
  // };

  onClick = (e) => {
    e.preventDefault();
    if (!this.state.name.trim() || !this.state.number.trim()) {
      return;
    }
    this.props.createUser(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onClick}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={this.handleClickName}
            value={this.state.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Number
          </label>
          <input
            name="number"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={this.handleClickName}
            value={this.state.number}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add contact
        </button>
      </form>
    );
  }
}
