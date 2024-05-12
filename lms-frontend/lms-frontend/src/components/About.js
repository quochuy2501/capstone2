import { useParams } from "react-router-dom";

function About() {
  let {id} = useParams();
    return (
      <h2>About us {id}</h2>
    );
  }
  
  export default About;