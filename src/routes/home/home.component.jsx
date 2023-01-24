import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

// import HomePage from './pages/homepage/homepage.component.jsx';

const Home = () => {
  
  return (
    <div>
        <Directory />
        <Outlet />
    </div>
  );
};

export default Home;