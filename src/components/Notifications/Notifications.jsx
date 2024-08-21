import React from "react";

const Notifications = () => {
  return (
    <div className="section-notification ">
      <div className="card">
        {/* list group */}
        <ul className="list-group list-group-flush">
          {/* list group item */}
          <li className="list-group-item p-3">
            <div
              className="d-flex justify-content-between
                    align-items-center"
            >
              <div className="d-flex align-items-center">
                {/* img */}
                <div>
                  <img
                    src="../assets/images/avatar/avatar-11.jpg"
                    alt="Image"
                    className="avatar-sm rounded-circle"
                  />
                </div>
                {/* content */}
                <div className="ms-3">
                  <p
                    className="mb-0
                          font-weight-medium"
                  >
                    <a href="#!">You </a>created a task for Development in{" "}
                    <a href="#!">Front End Developer Team</a>
                  </p>
                </div>
              </div>
              <div>
                {/* dropdown */}
                <div className="dropdown dropstart">
                  <a
                    href="#!"
                    className="btn btn-ghost btn-icon btn-sm rounded-circle"
                    id="dropdownactivityOne"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-vertical icon-xs"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownactivityOne"
                  >
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* list group item */}
          <li className="list-group-item p-3">
            <div
              className="d-flex justify-content-between
                    align-items-center"
            >
              <div className="d-flex align-items-center">
                {/* avatar */}
                <div>
                  <img
                    src="../assets/images/avatar/avatar-2.jpg"
                    alt="Image"
                    className="avatar-sm rounded-circle"
                  />
                </div>
                {/* content */}
                <div className="ms-3">
                  <p
                    className="mb-0 font-weight-medium
                          text-dark"
                  >
                    Watched a youtube video on Next Js Development.
                  </p>
                </div>
              </div>
              <div>
                {/* dropdown */}
                <div className="dropdown dropstart">
                  <a
                    href="#!"
                    className="btn btn-ghost btn-icon btn-sm rounded-circle"
                    id="dropdownactivityTwo"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-vertical icon-xs"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownactivityTwo"
                  >
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* list group item */}
          <li className="list-group-item p-3">
            <div
              className="d-flex justify-content-between
                    align-items-center"
            >
              <div className="d-flex align-items-center">
                {/* avatar */}
                <div>
                  <img
                    src="../assets/images/avatar/avatar-3.jpg"
                    alt="Image"
                    className="avatar-sm rounded-circle"
                  />
                </div>
                {/* content */}
                <div className="ms-3">
                  <p
                    className="mb-0
                          font-weight-medium"
                  >
                    Commented on Front End Development project of{" "}
                    <a href="#!">DashUI</a>.
                  </p>
                </div>
              </div>
              <div>
                {/* dropdown */}
                <div className="dropdown dropstart">
                  <a
                    href="#!"
                    className="btn btn-ghost btn-icon btn-sm rounded-circle"
                    id="dropdownactivityThree"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-vertical icon-xs"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownactivityThree"
                  >
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* list group item */}
          <li className="list-group-item p-3">
            <div
              className="d-flex justify-content-between
                    align-items-center"
            >
              <div className="d-flex align-items-center">
                {/* avatar */}
                <div>
                  <img
                    src="../assets/images/avatar/avatar-4.jpg"
                    alt="Image"
                    className="avatar-sm rounded-circle"
                  />
                </div>
                {/* content */}
                <div className="ms-3">
                  <p
                    className="mb-0
                          font-weight-medium"
                  >
                    Added new team member <a href="#!">Jhon Doe</a> UI/UX Design
                    Team.
                  </p>
                </div>
              </div>
              <div>
                {/* dropdown */}
                <div className="dropdown dropstart">
                  <a
                    href="#!"
                    className="btn btn-ghost btn-icon btn-sm rounded-circle"
                    id="dropdownactivityFour"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-vertical icon-xs"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownactivityFour"
                  >
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* list group item */}
          <li className="list-group-item p-3">
            <div
              className="d-flex justify-content-between
                    align-items-center"
            >
              <div className="d-flex align-items-center">
                {/* avatar */}
                <div>
                  <img
                    src="../assets/images/avatar/avatar-5.jpg"
                    alt="Image"
                    className="avatar-sm rounded-circle"
                  />
                </div>
                {/* content */}
                <div className="ms-3">
                  <p
                    className="mb-0
                          font-weight-medium"
                  >
                    Moved all upcoming changes in Review Coulmn for testing.
                  </p>
                </div>
              </div>
              <div>
                {/* dropdown */}
                <div className="dropdown dropstart">
                  <a
                    href="#!"
                    className="btn btn-ghost btn-icon btn-sm rounded-circle"
                    id="dropdownactivityFive"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-vertical icon-xs"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownactivityFive"
                  >
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* list group item */}
          <li className="list-group-item p-3">
            <div
              className="d-flex justify-content-between
                    align-items-center"
            >
              <div className="d-flex align-items-center">
                {/* avatar */}
                <div>
                  <img
                    src="../assets/images/avatar/avatar-6.jpg"
                    alt="Image"
                    className="avatar-sm rounded-circle"
                  />
                </div>
                {/* content */}
                <div className="ms-3">
                  <p
                    className="mb-0
                          font-weight-medium"
                  >
                    Created a Task for UI/UX designer and share a Figma Setup
                    project.
                  </p>
                </div>
              </div>
              <div>
                {/* dropdown */}
                <div className="dropdown dropstart">
                  <a
                    href="#!"
                    className="btn btn-ghost btn-icon btn-sm rounded-circle"
                    id="dropdownactivitySix"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-vertical icon-xs"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </svg>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownactivitySix"
                  >
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
