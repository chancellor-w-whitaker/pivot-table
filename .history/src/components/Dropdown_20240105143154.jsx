export const Dropdown = () => {
  return (
    <>
      <div className="dropdown">
        <div
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          type="button"
        >
          Dropdown button
        </div>
        <div></div>
        <ul className="dropdown-menu">
          {/* <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li> */}
        </ul>
      </div>
    </>
  );
};
