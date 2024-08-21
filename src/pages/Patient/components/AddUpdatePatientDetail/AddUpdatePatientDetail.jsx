import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import "./AddUpdatePatientDetail.scss";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useStateValue } from "../../../../StateProvider";
import { ConfirmationModal } from "../../../../components/Modals/ConfirmationModal";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebaseConfig";

const AddUpdatePatientDetail = () => {
  const [tab, setTab] = useState("information");
  const [{ userInfo }, dispatch] = useStateValue();
  const [taskStatus, setTaskStatus] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchFilter = searchParams.get("search_filter");
  const [title, setTitle] = useState("Add Pateient");

  const navigate = useNavigate();

  const { patientId } = useParams();

  const navigateToPatientWithId = (Id) => {
    if (searchFilter) {
      navigate(`/patient?patient_id=${Id}&search_filter=${searchFilter}`);
    } else {
      navigate(`/patient?patient_id=${Id}`);
    }
  };
  const navigateToPatient = () => {
    if (searchFilter) {
      navigate(`/patient?search_filter=${searchFilter}`);
    } else {
      navigate(`/patient`);
    }
  };
  // ********************************************** form start ****************************************************
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const watchedFields = watch();
  const onSubmit = async (data) => {
    console.log(data);
    dispatch({ type: "SET_LOADING", status: true });
    if (patientId) {
      try {
        const docRef = doc(db, "pateientDetail", patientId);
        await updateDoc(docRef, data);

        toast.success("Document updated successfully");
        navigateToPatientWithId(patientId);
      } catch (error) {
        toast.error("Error updating document: ", error);
      }
    } else {
      try {
        const re = await addDoc(collection(db, "pateientDetail"), {
          ...data,
          userId: auth.currentUser.uid,
          timestamp: new Date(),
        });
        toast.success("Form submitted successfully!");
        navigateToPatientWithId(re.id);
      } catch (error) {
        console.error("Error saving document: ", error);
        toast.error("Error submitting the form. Please try again.");
      }
    }
    dispatch({ type: "SET_LOADING", status: false });
  };
  // ********************************************** form end ****************************************************

  // ********************************************** get data end ****************************************************
  // ********************************************** get task data start****************************************************
  const fetchPatientDetail = async () => {
    // Perform the API call to fetch company info
    try {
      dispatch({ type: "SET_LOADING", status: true });
      const docRef = doc(db, "pateientDetail", patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setValue("Name", data?.Name);
      } else {
        toast.error("No such document!");
      }

      dispatch({ type: "SET_LOADING", status: false });
      // return response;
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors that occur
    }
  };
  const { data, refetch } = useQuery({
    queryKey: ["patient-detail"],
    queryFn: fetchPatientDetail,
    enabled: patientId ? true : false,
    // staleTime: Infinity,
    onSuccess: (Re) => {
      console.log(Re);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  // ********************************************** get task data end ****************************************************

  useEffect(() => {
    if (patientId && tab === "information") {
      setTitle("Update Patient");
    }
    if (!patientId && tab === "information") {
      setTitle("Add Patient");
    }
  }, [patientId]);

  const [funHandler, setFunHandler] = useState();
  const [confirmationShow, setConfirmationShow] = useState(false);
  const handleConfirmationClose = () => {
    setConfirmationShow(false);
  };
  const handleConfirmationShow = () => setConfirmationShow(true);
  const [confirmationResonShow, setConfirmationResonShow] = useState(false);
  const handleConfirmationResonClose = () => {
    setConfirmationResonShow(false);
  };
  const handleConfirmationResonShow = () => setConfirmationResonShow(true);

  return (
    <div id="app-content">
      {/* Container fluid */}
      <div className="app-content-area mb-10">
        <div className="container-fluid ">
          <div className=" mx-n6 mt-n6 pt-6 mb-6 header">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                {/* Page header */}
                <div
                  className="d-lg-flex
          align-items-center justify-content-between  px-6"
                >
                  {/* <div className="mb-6 mb-lg-0"> */}
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="">
                      <h1 className="mb-0 h3 ">{title}</h1>
                    </div>
                    <div lassName="status ">
                      <div
                        className="mb-0"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        {taskStatus}
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-between px-6">
                  {/* nav  */}
                  <ul className="nav nav-lb-tab ">
                    <li className="nav-item ms-0 me-3">
                      <div
                        role="button"
                        // className="nav-link active "
                        className={`${
                          tab === "information"
                            ? "nav-link active "
                            : "nav-link"
                        }`}
                        onClick={() => {
                          setTab("information");
                          setTitle(patientId ? "Update Task" : "Add Task");
                        }}
                      >
                        Information
                      </div>
                    </li>
                    {/* <li className="rounded-circl notification-count nav-item mx-3">
                      <div
                        role="button"
                        className={`${
                          tab === "attachments"
                            ? "nav-link active "
                            : "nav-link"
                        }`}
                        onClick={() => {
                          handleExternalSubmit();
                        }}
                        // onClick={() => setTab("attachments")}
                      >
                        Attachments
                      </div>
                      <div
                        className="notification-count d-flex justify-content-center"
                        style={{ top: "3px", right: "-14px" }}
                      >
                        {attachmentCount}
                      </div>
                    </li>
                    <li className="nav-item mx-3">
                      <div
                        role="button"
                        className={`${
                          tab === "notifications"
                            ? "nav-link active "
                            : "nav-link"
                        }`}
                        onClick={() => {
                          setTab("notifications");
                          setTitle(patientId ? "Update Task" : "Add Task");
                        }}
                      >
                        Notifications
                      </div>
                    </li>
                    <li className=" rounded-circl notification-count nav-item mx-3">
                      <div
                        role="button"
                        className={`${
                          tab === "comments" ? "nav-link active " : "nav-link"
                        }`}
                        onClick={() => {
                          setTab("comments");
                          setTitle(patientId ? "Update Task" : "Add Task");
                        }}
                      >
                        Comments
                      </div>
                      <div
                        className="notification-count d-flex justify-content-center"
                        style={{ top: "3px", right: "-14px" }}
                      >
                        {commentCount}
                      </div>
                    </li> */}
                  </ul>
                  {/* <div className="status fs-3">
                    <h3>{taskStatus}</h3>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              {/* Page header */}
              {/* <div className="mb-5">
                <h3 className="mb-0 ">Add Staff</h3>
              </div> */}
            </div>
          </div>
          <div>
            {/* row */}
            <div className="row">
              <div className="col-xl-12 col-md-12 col-12">
                {/* card */}
                {(() => {
                  switch (tab) {
                    case "information":
                      return (
                        // <form onSubmit={handleSubmit(onSubmit)}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="card mb-5">
                            {/* card body */}
                            <div className="card-body">
                              {/* form */}
                              <div className="row">
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Name
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter name"
                                      {...register("Name", {
                                        required: "Name is required",
                                      })}
                                    />
                                  </div>
                                  {errors.Name && (
                                    <div className="error">
                                      {errors.Name.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Mobile{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder="Enter mobile number"
                                    {...register("mobile", {
                                      required: "Mobile is required",
                                      pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Invalid mobile number.",
                                      },
                                    })}
                                  />
                                  {errors.mobile && (
                                    <div className="error">
                                      {errors.mobile.message}
                                    </div>
                                  )}
                                </div>

                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Appointment Date{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div
                                    className="input-group me-3 flatpickr rounded flatpickr-input"
                                    readOnly="readonly"
                                  >
                                    <input
                                      className="form-control "
                                      type="date"
                                      placeholder="Select Date"
                                      aria-describedby="basic-addon2"
                                      min="1000-01-01T00:00"
                                      max="9999-12-31T23:59"
                                      // disabled
                                      {...register("appointmentDate", {
                                        required:
                                          "Appointment Date is required",
                                      })}
                                    />
                                  </div>
                                  {errors.appointmentDate && (
                                    <div className="error">
                                      {errors.appointmentDate.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Age
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="Enter age"
                                      {...register("age", {
                                        required: "Age is required",
                                      })}
                                    />
                                  </div>
                                  {errors.age && (
                                    <div className="error">
                                      {errors.age.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">Gender</label>
                                  <span className="text-danger">*</span>

                                  <select
                                    className="form-select"
                                    {...register("gender", {
                                      required: "Gender is required",
                                    })}
                                  >
                                    <option value="">Set Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                  </select>
                                  {errors.gender && (
                                    <div className="error">
                                      {errors.gender.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Cast
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter cast"
                                      {...register("cast", {
                                        required: "Cast is required",
                                      })}
                                    />
                                  </div>
                                  {errors.cast && (
                                    <div className="error">
                                      {errors.cast.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Religion
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter religion"
                                      {...register("religion", {
                                        required: "Religion is required",
                                      })}
                                    />
                                  </div>
                                  {errors.religion && (
                                    <div className="error">
                                      {errors.religion.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Occupation
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter occupation"
                                      {...register("occupation", {
                                        required: "Occupation is required",
                                      })}
                                    />
                                  </div>
                                  {errors.occupation && (
                                    <div className="error">
                                      {errors.occupation.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-4 col-12">
                                  <label className="form-label">
                                    Qualification
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter qualification"
                                      {...register("qualification", {
                                        required: "Qualification is required",
                                      })}
                                    />
                                  </div>
                                  {errors.qualification && (
                                    <div className="error">
                                      {errors.qualification.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-6 col-12">
                                  <label className="form-label">
                                    Complaint
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      rows={3}
                                      placeholder="Enter complaint"
                                      {...register("complaint", {
                                        required: "Complaint is required",
                                      })}
                                    />
                                  </div>
                                  {errors.complaint && (
                                    <div className="error">
                                      {errors.complaint.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-6 col-12">
                                  <label className="form-label">
                                    Treatment
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      rows={3}
                                      placeholder="Enter treatment"
                                      {...register("treatment", {
                                        required: "Treatment is required",
                                      })}
                                    />
                                  </div>
                                  {errors.treatment && (
                                    <div className="error">
                                      {errors.treatment.message}
                                    </div>
                                  )}
                                </div>
                                {/* form group */}
                                <div className="mb-4 col-md-6 col-12">
                                  <label className="form-label">
                                    Address
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="d-flex ">
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter address"
                                      rows={3}
                                      {...register("address", {
                                        required: "Address is required",
                                      })}
                                    />
                                  </div>
                                  {errors.address && (
                                    <div className="error">
                                      {errors.address.message}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4  justify-content-between gap-4   bottom-btns-web">
                            <div className="left d-flex flex-wrap gap-3 align-items-center">
                              <div
                                className="btn btn-outline-danger "
                                style={{ height: "fit-content" }}
                                onClick={() => {
                                  if (patientId) {
                                    navigateToPatientWithId(patientId);
                                  } else {
                                    navigateToPatient();
                                  }
                                }}
                              >
                                Cancel
                              </div>
                            </div>

                            {/* // )} */}
                            <div className="d-flex right align-items-center">
                              <button className="  btn btn-primary  ">
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      );
                    // case "attachments":
                    //   return (
                    //     <Attachment
                    //       setTab={setTab}
                    //       setAttachmentCount={setAttachmentCount}
                    //       setTitle={setTitle}
                    //       attachmentType={"task"}
                    //       TranType={7}
                    //       AttchType={1}

                    //     />
                    //   );
                    // case "notifications":
                    //   return <></>;
                    // case "comments":
                    //   return (
                    //     <div className="w-100">
                    //       <div className="card mb-5">
                    //         {/* card body */}
                    //         <div className="card-body">
                    //           {/* form group */}

                    //           <div className="mb-4 col-md-12 col-12">
                    //             <label className="form-label">
                    //               Closing Comment{" "}
                    //             </label>
                    //             <textarea
                    //               type="text"
                    //               rows={5}
                    //               value={closingComment}
                    //               className="form-control"
                    //               // placeholder="Comment..."
                    //               disabled
                    //             ></textarea>
                    //             {errors.Dscr && (
                    //               <div className="error">
                    //                 {errors.Dscr.message}
                    //               </div>
                    //             )}
                    //           </div>
                    //           <div className="mb-4 col-md-12 col-12">
                    //             <label className="form-label">
                    //               Delay Reason{" "}
                    //             </label>
                    //             <textarea
                    //               type="text"
                    //               rows={5}
                    //               value={delayReason}
                    //               className="form-control"
                    //               // placeholder="Enter Description"
                    //               disabled
                    //             ></textarea>
                    //             {errors.Dscr && (
                    //               <div className="error">
                    //                 {errors.Dscr.message}
                    //               </div>
                    //             )}
                    //           </div>
                    //           <div className="mb-4 col-md-12 col-12">
                    //             <label className="form-label">
                    //               Rejection Reason{" "}
                    //             </label>
                    //             <textarea
                    //               type="text"
                    //               rows={5}
                    //               value={rejectionReason}
                    //               className="form-control"
                    //               // placeholder="Enter Description"
                    //               disabled
                    //             ></textarea>
                    //             {errors.Dscr && (
                    //               <div className="error">
                    //                 {errors.Dscr.message}
                    //               </div>
                    //             )}
                    //           </div>
                    //           <div className="mb-4 col-md-12 col-12">
                    //             <label className="form-label">
                    //               Cancel Reason{" "}
                    //             </label>
                    //             <textarea
                    //               type="text"
                    //               rows={5}
                    //               value={cancelReason}
                    //               className="form-control"
                    //               // placeholder="Enter Description"
                    //               disabled
                    //             ></textarea>
                    //             {errors.Dscr && (
                    //               <div className="error">
                    //                 {errors.Dscr.message}
                    //               </div>
                    //             )}
                    //           </div>

                    //           {/* </div> */}
                    //         </div>
                    //         <div className="mt-4  justify-content-between gap-4   bottom-btns-web"></div>
                    //       </div>
                    //       <div className="right d-flex flex-wrap gap-3 align-items-center">
                    //         <div
                    //           className="btn btn-outline-danger "
                    //           style={{ height: "fit-content" }}
                    //           onClick={() => {
                    //             if (patientId) {
                    //               navigateToTaskWithId(patientId);
                    //               // navigate(`/task?patientId=${patientId}`);
                    //             } else {
                    //               navigateToTask();
                    //               // navigate("/task");
                    //             }
                    //           }}
                    //         >
                    //           Cancel
                    //         </div>
                    //       </div>
                    //     </div>
                    //   );

                    default:
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        show={confirmationShow}
        onHide={handleConfirmationClose}
        funHandler={funHandler}
      />
    </div>
  );
};

export default AddUpdatePatientDetail;
