import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { GetChatList } from "../../../../apiCall";

const ChatList = () => {
  const fetchChatList = async () => {
    // Perform the API call to fetch company info
    try {
      const response = await GetChatList();
      console.log(response.status);
      if (response.status === 200) {
        console.log(response.data.value);
        setChatList(response.data.value);
        setFilteredData(response.data.value);
      } else {
        toast.error(response?.response?.data?.status[0].ResponseMessage);
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors that occur
      throw error;
    }
  };
  const {
    isLoading,
    isFetching,
    data: chatListData,
    refetch,
  } = useQuery({
    queryKey: ["chat-list"],
    queryFn: () => fetchChatList(),
    onSuccess: (Re) => {
      console.log(Re);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [chatList, setChatList] = useState(
    chatListData?.status === 200 ? chatListData.data.value : []
  );
  const [filteredData, setFilteredData] = useState([]);
  const handelSearch =(e)=>{
    const value = e.target.value;

    const filtered = chatList.filter(item => {
        const matchesName = item.customer__full_name.toLowerCase().includes(value.toLowerCase());
        const matchesPhone = String(item.customer__phone_number).includes(value);
        return matchesName || matchesPhone;
      });

      setFilteredData(filtered)

  }

  return (
    <div className="chat-window">
      <div className="chat-sticky-header sticky-top">
        <div className="px-4 pt-3 pb-4">
          {/* heading */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-0  h3">Chats</h1>
            </div>
           
          </div>
          {/* search */}
          <div className="mt-4 mb-4">
            <input
              type="search"
              className="form-control"
              onChange={(e)=>handelSearch(e)}
              placeholder="Search name and phone number"
            />
          </div>
          <div  style={{height:"69vh",overflowY:"scroll"}}>
            {filteredData.map((item) => (
              <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                {/* media */}
                <Link to={`/chat?chatId=${item.id}`} className="text-inherit">
                  <div className="d-flex">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                      <img
                        src="./assets/images/avatar/male.jpg"
                        alt="Imagde"
                        className="rounded-circle"
                      />
                    </div>
                    {/* media body */}
                    <div className=" ms-2">
                      <h5 className="mb-0">{item.customer__full_name}</h5>
                      <p className="mb-0 text-muted">
                        {item.customer__phone_number}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* nav tabs*/}
      </div>
    </div>
  );
};

export default ChatList;
