export const Filter = ({title, userFilter}) => {

  // handleFilter = ({ target }) => {
  //   this.props.userFilter(target.value);
  // };

    return (
      <div>
        <h3>{title}</h3>
        <input
          name="filter"
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={userFilter}
        />
      </div>
    );
}
