import { MessageSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <div id="maincontainer">
      <div id="logocontainer">
        <div id="logo" className="flex items-center justify-center bg-purple-500 w-12 h-12 rounded-t-lg rounded-r-lg">
          <MessageSquare color="#ffffff" strokeWidth={1.25} />
        </div>
        <div className="logotext">

        </div>
      </div>
    </div>
  );
}
