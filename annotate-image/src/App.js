import './App.css';
import Navbar from './Navbar.js'
import Labels from './Labels.js'
import Footer from './Footer.js'
import Workspace from './Workspace.js'

import './Navbar.css'
import './Labels.css'
import './Footer.css'
import './Workspace.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='labels-workspace'>
        <Labels />
        <Workspace />
      </div>
      <Footer />
    </div>
  );
}

export default App;
