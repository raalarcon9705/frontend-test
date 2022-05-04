import { Routes, Route } from "react-router-dom";
import Chat from './routes/Chat';
import Conversation from "./routes/Conversation";
import Login from './routes/Login';
import NoopConversation from "./routes/Noop";

function App() {
  return <Routes>
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Chat />} >
      <Route path=":id" element={<Conversation />} />
      <Route path="/" element={<NoopConversation />} />
    </Route>
  </Routes>
}

export default App;
