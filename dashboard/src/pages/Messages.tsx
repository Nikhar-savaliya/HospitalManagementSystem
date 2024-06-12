import { getAllMessages } from "@/api";
import { useEffect, useState } from "react";

const Messages = () => {
  const [msgs, setMsgs] = useState<any>([]);

  useEffect(() => {
    const getAllMsg = async () => {
      const res = await getAllMessages();
      setMsgs(res.data.messages);
    };
    getAllMsg();
  }, []);

  return (
    <div className="flex flex-col gap-4 m-10">
      {msgs.length ? (
        msgs.map((msg: any) => {
          return (
            <div key={msg._id} className="border p-4 bg-muted">
              <p className="text-2xl font-semibold"> {msg.message}</p>
              <h1 className="">
                {msg.firstName} {msg.lastName}
              </h1>
              <p>email: {msg.email}</p>
            </div>
          );
        })
      ) : (
        <p>messages not found</p>
      )}
    </div>
  );
};

export default Messages;
