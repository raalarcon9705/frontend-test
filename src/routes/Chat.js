import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../store/features/auth';
import Dashboard from '../components/Dashboard';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';


function Chat() {
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate('/login');
    }
  }, [loggedUser, navigate])

  return <Dashboard />
}

export default Chat;
