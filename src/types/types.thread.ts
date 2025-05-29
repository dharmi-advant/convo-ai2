export type ThreadType = {
  id: string;
  title: string;
  messages: { sender: string; text: string }[];
};
