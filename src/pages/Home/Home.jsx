import React, { useState } from "react";
import { BsListTask } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineUpcoming } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const useToggle = () => {
    const [state, setState] = useState(true);
    const toggle = () => {
      setState(!state);
    };
    return [state, toggle];
  };

  const fetchDashboardCount = async () => {
    // Perform the API call to fetch company info
    // try {
    //   const response = await getDashboardCounts();
    //   if (response.status === 200) {
    //     setDashboardCount(response.data.data);
    //   } else {
    //     toast.error(response?.response?.data?.message);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error); // Log any errors that occur
    //   throw error;
    // }
  };
  const {
    isLoading,
    isFetching,
    data: staffListData,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-count"],
    queryFn: () => fetchDashboardCount(),
    onSuccess: (Re) => {
      console.log(Re);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [dashboardCount, setDashboardCount] = useState([]);

  const [isToggled, setIsToggle] = useState();
  const toggle = () => {
    setIsToggle(!isToggled);
  };
  console.log(isToggled);
  return (
    <div id="app-content">
      {/* Container fluid */}
      <div className="app-content-area">
        <div className=" pt-10 pb-21 mt-n6 mx-n4" />
        <div className="container-fluid mt-n22 ">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              {/* Page header */}
              <div className="d-flex justify-content-between align-items-center mb-5">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  ">Dashboard</h3>
                </div>
                {/* <div>
                  <a href="#!" className="btn btn-white">
                    Create New Project
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
              {/* card */}
              <div className="card h-100 card-lift">
                {/* card body */}
                <div className="card-body">
                  {/* heading */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="mb-0">Over due</h4>
                    </div>
                    <div className="icon-shape icon-md bg-primary-soft text-primary rounded-2">
                      <TbCalendarDue size={20} />
                    </div>
                  </div>
                  {/* project number */}
                  <div className="lh-1">
                    <h1 className=" mb-1 fw-bold">{dashboardCount?.overdue_count?dashboardCount?.overdue_count:0}</h1>
                    {/* <p className="mb-0">
                      <span className="text-dark me-2">2</span>Completed
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
              {/* card */}
              <div className="card h-100 card-lift">
                {/* card body */}
                <div className="card-body">
                  {/* heading */}
                  <div
                    className="d-flex justify-content-between align-items-center
              mb-3"
                  >
                    <div>
                      <h4 className="mb-0">On Going</h4>
                    </div>
                    <div
                      className="icon-shape icon-md bg-primary-soft text-primary
                rounded-2"
                    >
                      <BsListTask size={20} />
                    </div>
                  </div>
                  {/* project number */}
                  <div className="lh-1">
                    <h1 className="  mb-1 fw-bold">{dashboardCount?.ongoing_count?dashboardCount?.ongoing_count:0}</h1>
                    {/* <p className="mb-0">
                      <span className="text-dark me-2">28</span>Completed
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
              {/* card */}
              <div className="card h-100 card-lift">
                {/* card body */}
                <div className="card-body">
                  {/* heading */}
                  <div
                    className="d-flex justify-content-between align-items-center
              mb-3"
                  >
                    <div>
                      <h4 className="mb-0">Under Review</h4>
                    </div>
                    <div
                      className="icon-shape icon-md bg-primary-soft text-primary
                rounded-2"
                    >
                      <MdOutlineReviews size={20} />
                    </div>
                  </div>
                  {/* project number */}
                  <div className="lh-1">
                    <h1 className="  mb-1 fw-bold">{dashboardCount?.under_review_count?dashboardCount?.under_review_count:0}</h1>
                    {/* <p className="mb-0">
                      <span className="text-dark me-2">1</span>Completed
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
              {/* card */}
              <div className="card h-100 card-lift">
                {/* card body */}
                <div className="card-body">
                  {/* heading */}
                  <div
                    className="d-flex justify-content-between align-items-center
              mb-3"
                  >
                    <div>
                      <h4 className="mb-0">Up Coming</h4>
                    </div>
                    <div
                      className="icon-shape icon-md bg-primary-soft text-primary
                rounded-2"
                    >
                      <MdOutlineUpcoming size={20} />
                    </div>
                  </div>
                  {/* project number */}
                  <div className="lh-1">
                    <h1 className="  mb-1 fw-bold">{dashboardCount?.upcoming_count?dashboardCount?.upcoming_count:0}</h1>
                    {/* <p className="mb-0">
                      <span className="text-dark me-2">1</span>Completed
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row  */}
          <div className="row ">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-5 mb-xl-0">
              <div className="card h-100">
                {/* card header  */}
                <div className="card-header d-flex justify-content-between align-items-center bg-primary-soft">
                  <h4 className="mb-0 " style={{ fontSize: "20px" }}>
                    {" "}
                    Notifications
                  </h4>
                </div>
                {/* table  */}
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table text-nowrap mb-0 table-centered table-hover">
                      <thead className="table-light d-none">
                        <tr>
                          <th>Name</th>
                          <th>Deadline</th>
                          {/* <th>Status</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="d-flex">
                          <td className="d-flex flex-column w-50 text-wrap">
                            {" "}
                            <strong>Notification 3</strong>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.{" "}
                            </p>
                          </td>
                          <td className="w-50 d-flex flex-column align-items-end">
                            {" "}
                            <div className="w-fi">
                              <strong>Sender</strong>
                              <p>
                                Date:- 13 may 2001 <br />
                                Time:- 5:00 pm
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr className="d-flex">
                          <td className="d-flex flex-column w-50 text-wrap">
                            {" "}
                            <strong>Notification 2</strong>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.{" "}
                            </p>
                          </td>
                          <td className="w-50 d-flex flex-column align-items-end">
                            {" "}
                            <div className="w-fi">
                              <strong>Sender</strong>
                              <p>
                                Date:- 13 may 2001 <br />
                                Time:- 5:00 pm
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr className="d-flex">
                          <td className="d-flex flex-column w-50 text-wrap">
                            {" "}
                            <strong>Notification 1</strong>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.{" "}
                            </p>
                          </td>
                          <td className="w-50 d-flex flex-column align-items-end">
                            {" "}
                            <div className="w-fi">
                              <strong>Sender</strong>
                              <p>
                                Date:- 13 may 2001 <br />
                                Time:- 5:00 pm
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row  */}
        </div>
      </div>
    </div>
  );
};

export default Home;
