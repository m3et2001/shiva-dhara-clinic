import React, { useEffect, useRef, useState } from "react";
import { BsListTask } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineReviews } from "react-icons/md";
import { MdOutlineUpcoming } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { CgAttachment } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { ConfirmationModal } from "../../../../components/Modals/ConfirmationModal";
import { ITEMS_PER_PAGE } from "../../../../Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const PatientList = () => {
  const searchInput = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patientId = searchParams.get("patient_id");
  const deleteData = async (docId) => {
    try {
      const docRef = doc(db, "pateientDetail", docId);
      const re = await deleteDoc(docRef);
      console.log(re);
      refetch();
      toast.success("Document deleted successfully");
    } catch (error) {
      toast.error("Error deleting document: ", error);
    }
  };
  const editTPatientDetail = (id) => {
    navigate(`/update/patient/${id}?status_filter=${searchQuery}`);
  };
  const fetchPatientList = async () => {
    try {
      const response = await getDocs(collection(db, "pateientDetail"));
      const docsData = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (docsData) {
        setPatientList(docsData);
        setFilteredData(docsData);
        setCurrentItems(docsData);
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors that occur
      throw error;
    }
  };
  const { isLoading, isFetching, data, refetch } = useQuery({
    queryKey: ["patient-list"],
    queryFn: () => fetchPatientList(),
    onSuccess: (Re) => {
      console.log(Re);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const handleSearch = () => {
    // removeSelection();

    const query = searchInput.current.value.toLowerCase();
    setSearchQuery(query);
    // refetch();
    // setDefaultValue();
  };
  const [confirmationShow, setConfirmationShow] = useState(false);
  const [funHandler, setFunHandler] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [patientList, setPatientList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const navigate = useNavigate();

  const handleConfirmationClose = () => {
    setConfirmationShow(false);
  };
  const handleConfirmationShow = () => setConfirmationShow(true);

  const filterData = (query) => {
    let filtered = patientList;

    if (query) {
      filtered = filtered.filter(
        (item) => item.Name.toLowerCase().includes(query)
        // item.Dscr.toLowerCase().includes(query)
      );
    }
    setFilteredData(filtered);
    setCurrentItems(filtered);
    // setCurrentPage(1);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const removeSelection = () => {
    navigate("/patient")
    // setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const totalPageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    setCurrentItems(filteredData.slice(startIdx, startIdx + ITEMS_PER_PAGE));
    setTotalPages(totalPageCount);
    if (totalPageCount !== 0 && totalPageCount < currentPage) {
      setCurrentPage(totalPageCount);
    }
  }, [currentPage, filteredData]);

  useEffect(() => {
    filterData(searchQuery);
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    console.log(patientId, filteredData);
    if (patientId && filteredData.length > 0) {
      const targetIndex = filteredData.findIndex(
        (item) => item.ID === parseInt(patientId)
      );
      if (targetIndex !== -1) {
        const pageNumber = Math.floor(targetIndex / ITEMS_PER_PAGE) + 1;
        setCurrentPage(pageNumber);
        // setCurrentItems(
        //   filteredData.slice(targetIndex, targetIndex + Number(sysConfig["Rows in MultiLine List"]))
        // );
      }
    }
  }, [patientId, filteredData]);
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
                  <h3 className="mb-0  ">Patient List</h3>
                </div>
              </div>
            </div>
          </div>
          {/* row  */}

          <div className="row">
            <div className="col-12">
              {/* card */}
              <div className="card mb-4">
                <div className="card-header  ">
                  <div className="row ">
                    <div className="col-md-12 mb-3 d-flex justify-content-end">
                      <div
                        className="btn btn-primary me-2"
                        onClick={() => navigate("/add/patient")}
                      >
                        + Add Patient
                      </div>
                    </div>
                  </div>
                  <>
                    <div className="row justify-content-between">
                      <div className=" col-lg-4 col-md-6 mt-md-3 d-flex">
                        <input
                          ref={searchInput}
                          type="search"
                          className="form-control "
                          // value={searchQuery}
                          onChange={(e) => {
                            if (e.target.value === "") {
                              handleSearch();
                            }
                          }}
                          placeholder="Search for Name & Description."
                        />
                        <div
                          className="btn btn-primary ms-3"
                          onClick={() => handleSearch()}
                        >
                          <IoMdSearch size={25} />
                        </div>
                      </div>
                    </div>
                  </>
                </div>
                {!isLoading ? (
                  <>
                    <div className="card-body">
                      <div className="table-responsive table-card">
                        {currentItems.length > 0 ? (
                          <table className="table text-nowrap mb-0 table-centered table-hover">
                            <thead className="table-light">
                              <tr>
                                <th className=" pe-0  ">Name</th>
                                <th className="">Age</th>
                                <th className="">Gender</th>
                                <th className="">Address</th>
                                <th className="">Phone Number</th>
                                <th>Date</th>
                                <th>Complaint</th>
                                <th>Treatment</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems.map((patient, index) => (
                                <tr
                                  id={`user-${index}`}
                                  className={`${
                                    patientId === patient?.id
                                      ? "table-primary"
                                      : ""
                                  }`}
                                >
                                  <td
                                    style={{
                                      maxWidth: "350px",
                                      minWidth: "220px",
                                      textWrap: "wrap",
                                    }}
                                  >
                                    <strong
                                      className="cursor-pointer"
                                      onClick={() =>
                                        editTPatientDetail(patient.id)
                                      }
                                    >
                                      {patient?.Name}
                                    </strong>
                                  </td>

                                  <td className="">{patient?.age}</td>
                                  <td className="">{patient?.gender}</td>
                                  <td
                                    style={{
                                      maxWidth: "300px",
                                      minWidth: "150px",
                                      textWrap: "wrap",
                                    }}
                                  >
                                    <div className="truncate">
                                      {patient?.address}
                                    </div>
                                  </td>
                                  <td className="">{patient?.mobile}</td>
                                  <td className="">
                                    {patient?.appointmentDate}
                                  </td>
                                  <td
                                    style={{
                                      maxWidth: "300px",
                                      textWrap: "wrap",
                                    }}
                                  >
                                    <div className="truncate">
                                      {patient?.complaint}
                                    </div>
                                  </td>
                                  <td
                                    style={{
                                      maxWidth: "300px",
                                      textWrap: "wrap",
                                    }}
                                  >
                                    <div className="truncate">
                                      {patient?.treatment}
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      className="btn btn-ghost btn-icon btn-sm rounded-circle texttooltip"
                                      data-template="editOne"
                                      onClick={() =>
                                        editTPatientDetail(patient.id)
                                      }
                                    >
                                      <FaRegEdit
                                        size={20}
                                        style={{ fill: "#315b60" }}
                                      />
                                      <div id="editOne" className="d-none">
                                        <span>Edit</span>
                                      </div>
                                    </div>

                                    <div
                                      className="btn btn-ghost btn-icon btn-sm rounded-circle texttooltip"
                                      data-template="trashOne"
                                      onClick={() => {
                                        handleConfirmationShow();
                                        removeSelection()
                                        setFunHandler({
                                          fun: deleteData,
                                          id: patient.id,
                                          title: "delete task",
                                        });
                                      }}
                                    >
                                      <MdOutlineDelete
                                        size={22}
                                        style={{ fill: "#d2042dc7" }}
                                      />
                                      <div
                                        id="trashOne"
                                        className="d-none"
                                        // onClick={() => deleteTask(task.ID)}
                                      >
                                        <span>Delete</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="m-5 fs-3">
                            <strong>No records found.!</strong>
                          </div>
                        )}
                      </div>
                    </div>
                    {filteredData.length > 0 && (
                      <div className="card-footer d-md-flex justify-content-between align-items-center">
                        <span>
                          Showing{" "}
                          {currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1} to{" "}
                          {currentPage * ITEMS_PER_PAGE >= filteredData.length
                            ? filteredData.length
                            : currentPage * ITEMS_PER_PAGE}{" "}
                          of {filteredData.length} entries
                        </span>
                        <nav className="mt-2 mt-md-0">
                          <ul className="pagination mb-0 ">
                            <li
                              className="page-item "
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                if (currentPage > 1) {
                                  handlePageChange(currentPage - 1);
                                  removeSelection();
                                }
                              }}
                            >
                              <div className="page-link">Previous</div>
                            </li>
                            {Array(totalPages ? totalPages : 0)
                              .fill()
                              .map((item, index) => (
                                <li
                                  style={{ cursor: "pointer" }}
                                  className={`${
                                    currentPage === index + 1
                                      ? "page-item active"
                                      : "page-item"
                                  }`}
                                  onClick={() => {
                                    handlePageChange(index + 1);
                                    removeSelection();
                                  }}
                                >
                                  <div className="page-link">{index + 1}</div>
                                </li>
                              ))}

                            <li className="page-item">
                              <div
                                style={{ cursor: "pointer" }}
                                className="page-link"
                                onClick={() => {
                                  if (totalPages > currentPage) {
                                    removeSelection();
                                    handlePageChange(currentPage + 1);
                                  }
                                }}
                              >
                                Next
                              </div>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="m-5 fs-3">
                    <strong>Fetching records..</strong>
                  </div>
                )}
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

export default PatientList;
