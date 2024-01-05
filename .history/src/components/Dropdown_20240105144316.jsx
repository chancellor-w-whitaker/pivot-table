export const Dropdown = ({ childTwo, trigger }) => {
  return (
    <>
      <div className="dropdown">
        {trigger}
        {/* <div
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          type="button"
        >
          Dropdown button
        </div> */}
        <ul className="dropdown-menu">
          {childTwo}
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
