export const Dropdown = ({ childOne, childTwo }) => {
  return (
    <>
      <div className="dropdown">
        {childOne}
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
