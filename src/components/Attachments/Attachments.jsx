import React from "react";

const Attachments = () => {
  return (
    <div className="attechments-card">
      <div className="card mb-5 ">
        <div className="card-header">
          <h4 className="mb-0">Attached files</h4>
        </div>
        <div className="card-body">
          <div>
            <h5>Add Attached files here.</h5>
            <div className=" p-10  border-dashed mb-4 text-center">
              <span>Drop files here to upload</span>
            </div>
            <div className="card card-bordered  mb-4 ">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src="../assets/images/background/profile-bg.jpg"
                      alt=""
                      className="icon-shape icon-xxl rounded-3"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">
                        Uploaded Image Title 02-08-2023 at 4:35:56 PM.png
                      </h6>
                      <small>0.8 MB</small>
                    </div>
                  </div>
                  <div>
                    <a href="#!" className="link-danger">
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
                        className="feather feather-trash-2 icon-xs"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card-bordered  mb-4 ">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src="../assets/images/background/profile-bg.jpg"
                      alt=""
                      className="icon-shape icon-xxl rounded-3"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">
                        Uploaded Image Title 02-08-2023 at 4:35:56 PM.png
                      </h6>
                      <small>0.8 MB</small>
                    </div>
                  </div>
                  <div>
                    <a href="#!" className="link-danger">
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
                        className="feather feather-trash-2 icon-xs"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <a href="#!" className="btn btn-primary me-2">
          Save
        </a>
      
      </div>
    </div>
  );
};

export default Attachments;
