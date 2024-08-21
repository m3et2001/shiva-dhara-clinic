import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { GetChatMessage } from "../../../../apiCall";
import { useQuery } from "@tanstack/react-query";
import defaultBg from "../../../../assets/images/default_chat_bg.png";
import { formatDateTime } from "../../../../utils/FormateDate";
import "./ChatWindow.scss";
import { useStateValue } from "../../../../StateProvider";

const ChatWindow = () => {
  const [, dispatch] = useStateValue();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const chatId = searchParams.get("chatId");
  const fetchChatList = async (chatId) => {
    // Perform the API call to fetch company info
    dispatch({ type: "SET_LOADING", status: true });
    try {
      const response = await GetChatMessage(chatId);
      console.log(response.status);
      if (response.status === 200) {
        console.log(response.data.value);
        setChatDetail(response.data.value);
      } else {
        toast.error(response?.response?.data?.status[0].ResponseMessage);
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors that occur
      throw error;
    }
    setTimeout(dispatch({ type: "SET_LOADING", status: false }), 10000);
    
  };
  const {
    isLoading,
    isFetching,
    data: chatData,
    refetch,
  } = useQuery({
    queryKey: ["chat-detail", chatId],
    queryFn: () => fetchChatList(chatId),
    enabled: chatId ? true : false,
    onSuccess: (Re) => {
      console.log(Re);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [chatDetail, setChatDetail] = useState(
    chatData?.status === 200 ? chatData.data.value : {}
  );
  return (
    <div className="col-xxl-9 col-xl-8 col-md-12 col-12 h-100">
      {/* chat list */}
      {chatDetail?.name ? (
        <div
          className={`chat-body w-100  ${
            chatId ? "chat-body-visible" : "d-none"
          }`}
          // style={{ height: "87vh" }}
        >
          <div className="card-header sticky-top h-100 p-0  ">
            <div className="d-flex justify-content-between align-items-center shadow bg-white rounded p-3">
              {/* media */}
              <div className="d-flex align-items-center" id="active-chat-user">
                <Link to="/" className=" d-xl-none d-block" data-close="">
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
                    className="feather feather-arrow-left"
                  >
                    <line x1={19} y1={12} x2={5} y2={12} />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </Link>
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <img
                    src="./assets/images/avatar/male.jpg"
                    alt="Imagde"
                    className="rounded-circle"
                  />
                </div>
                {/* media body */}
                <div className=" ms-2">
                  <h4 className="mb-0">{chatDetail?.name}</h4>
                  <p className="mb-0 text-muted">{chatDetail?.phone_number}</p>
                </div>
              </div>
            </div>
            <div
              className="card-body simplebar-scrollable-y"
              id="conversation-list"
              data-simplebar="init"
              style={{ height: 650, overflow: "auto" }}
            >
              <div className="simplebar-wrapper" style={{ margin: "-20px" }}>
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer" />
                </div>
                <div className="simplebar-mask">
                  <div
                    className="simplebar-offset"
                    style={{ right: 0, bottom: 0 }}
                  >
                    <div
                      className="simplebar-content-wrapper"
                      tabIndex={0}
                      role="region"
                      aria-label="scrollable content"
                      style={{
                        height: "100%",
                        overflow: "hidden scroll",
                      }}
                    >
                      <div
                        className="simplebar-content"
                        // style={{
                        //   padding: 20,
                        //   height: "76vh",
                        //   overflowY: "scroll",
                        // }}
                      >
                        {chatDetail?.messages.map((message) =>
                          message["Message Type"] === "User Response" ? (
                            <div className="d-flex justify-content-end mb-4">
                              {/* media */}
                              <div className="d-flex w-lg-40 justify-content-end">
                                {/* media body */}
                                <div className=" me-3 text-start">
                                  <small className="d-flex flex-column">
                                    <div className="name truncate-1">
                                      {chatDetail?.name}
                                    </div>{" "}
                                    {formatDateTime(message.datetime)}
                                  </small>
                                  <div className="d-flex">
                                    {/* card */}
                                    <div
                                      className="card mt-2 rounded-top-md-end-0  text-white "
                                      style={{ background: "#624bff" }}
                                    >
                                      {/* card body */}
                                      <div className="card-body text-start p-3">
                                        <p className="mb-0">
                                          {message.message}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* img */}
                                <img
                                  src="./assets/images/avatar/male.jpg"
                                  alt="Imagee"
                                  className="rounded-circle avatar-md"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex w-lg-40 mb-4">
                              <img
                                src="./assets/images/avatar/bot.jpg"
                                alt="Imagee"
                                className="rounded-circle avatar-md user-avatar"
                              />
                              {/* media body */}
                              <div className=" ms-3">
                                <small className="d-flex flex-column">
                                  <span className="username">Chat Bot</span>
                                  {formatDateTime(message.datetime)}
                                </small>
                                <div className="d-flex">
                                  <div className="card mt-2 rounded-top-md-left-0 border">
                                    <div className="card-body p-3">
                                      <p className="mb-0 text-dark">
                                        {message.message}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="ms-2 mt-2">
                                    {/* dropdown */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="simplebar-placeholder"
                  style={{ width: 748, height: 753 }}
                />
              </div>
              <div
                className="simplebar-track simplebar-horizontal"
                style={{ visibility: "hidden" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{
                    width: 0,
                    transform: "translate3d(0px, 0px, 0px)",
                    display: "none",
                  }}
                />
              </div>
              <div
                className="simplebar-track simplebar-vertical"
                style={{ visibility: "visible" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{
                    height: 561,
                    transform: "translate3d(0px, 0px, 0px)",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <img src={defaultBg} alt="" className="w-75  m-auto" />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
