interface Message {
  messageThreadId: string;
  message: string;
  createdAt: string;
  status: "approved" | "pending_review" | "active";
  sellerName: string;
  buyerName: string;
}

const messages: Message[] = [
  {
    messageThreadId: "1",
    message: "Hello, I'm interested in your product.",
    createdAt: "2023-01-01T12:00:00Z",
    status: "approved",
    sellerName: "John Doe",
    buyerName: "Alice Johnson",
  },
  {
    messageThreadId: "2",
    message: "Is this still available?",
    createdAt: "2023-01-02T12:00:00Z",
    status: "pending_review",
    sellerName: "Jane Smith",
    buyerName: "Bob Lee",
  },
  {
    messageThreadId: "3",
    message: "Can you ship this to another city?",
    createdAt: "2023-01-03T12:00:00Z",
    status: "active",
    sellerName: "Bob Lee",
    buyerName: "Jane Smith",
  },
];

export default messages;
