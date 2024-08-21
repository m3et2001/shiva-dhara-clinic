import ChatWindow from "./components/ChatWindow/ChatWindow";
import ChatList from "./components/ChatList/ChatList";

function Chat() {
  return (
    <div id="app-content">
      <div className="app-content-area">
        <div className="container-fluid">
          {/* row */}
          <div className="card chat-layout">
            <div className="row g-0" style={{height:"87vh"}}>
              <div className="col-xxl-3 col-xl-4 col-md-12 col-12 border-end">
                <div className="h-100">
                  {/* chat list */}

                  <ChatList />
                </div>
              </div>
              <ChatWindow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
