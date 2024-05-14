import React, { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

const MessageForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(firstName, lastName, email, phone, message);
  };

  return (
    <div className="container mt-16">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-8 gap-4 my-6 bg-secondary text-secondary-foreground p-4"
      >
        <h1 className="h1 col-span-8">Write your message</h1>
        <Input
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="col-span-4"
        />
        <Input
          type="text"
          placeholder="Lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="col-span-4"
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          className="col-span-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="col-span-4"
        />
        <textarea
          placeholder="Message"
          rows={7}
          value={message}
          className="col-span-8 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="flex items-center gap-1 col-span-1">
          <Send width={16} />
          Submit
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;
