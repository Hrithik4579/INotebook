import React, { useContext } from "react";
import Noteitem from "./Noteitem";
import Notes from "./Notes";
const Home = (props) => {
    const {showAlert}=props;

  return (
    <div className="mainBody">
       {/* <img src="notesimg.jpg"></img> */}
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
