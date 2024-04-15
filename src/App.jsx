import { useEffect } from "react";
import { useState } from "react";
import Tour from "./Tour";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, SetTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    SetTours(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      SetTours(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading></Loading>
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            type="button"
            style={{ marginTop: "2rem" }}
            onClick={fetchTours}
            className="btn"
          >
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}></Tours>
    </main>
  );
};
export default App;
