import { AuthProvider } from './context/AuthContext';
import { ListasProvider } from './context/ListasContext';
import NavigationBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import RouterNavbar from './components/organisms/RouterNavbar';
import Divider from './components/atoms/Divider';

function App() {
  return (
    <AuthProvider>
      <ListasProvider>
        <NavigationBar />
        <Divider />
        <RouterNavbar />
        <Footer />
      </ListasProvider>
    </AuthProvider>
  );
}

export default App;