import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Home = () => {
  return (
    <div className="p-2">
      <div className="mb-2">
        Welcome to THC's own implementation of the technical test
      </div>
      <div>
        <FontAwesomeIcon icon="arrow-left" className="mr-2" />
        Start by going somewhere in the menu
      </div>
    </div>
  );
};
export default Home;
