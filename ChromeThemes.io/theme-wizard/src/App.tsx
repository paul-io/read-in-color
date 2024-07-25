import UserPage from './pages/userPage';
import GuestPage from './pages/guestPage';

const App = () => {
    // check sign in if yes send to user page else guest
  return (
    <div>
         <GuestPage/>     
      
    </div>
  );
};

export default App;