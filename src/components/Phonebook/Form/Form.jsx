import { useState } from 'react';

export const Form = ({createUser}) => {
  // state = {
  //   name: '',
  //   number: '',
  // };
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleClickName = ({ target }) => {
    setName(target.value)
  };
  const handleClickNumber = ({ target }) => {
    setNumber(target.value)
  };



  const onClick = (e) => {
    e.preventDefault();
    if (!name.trim() || !number.trim()) {
      return;
    }
    createUser(name, number);
    setName('')
    setNumber('')
  };

    return (
      <form onSubmit={onClick}>
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
            onChange={handleClickName}
            value={name}
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
            onChange={handleClickNumber}
            value={number}
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
