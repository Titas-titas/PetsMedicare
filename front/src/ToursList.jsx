import axios from "axios";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

function ToursList (){
      const [tours, setTours] = useState([]);
    
      const {showBoundary} = useErrorBoundary();
    
      const getTours =  async () =>{
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/tours`,{withCredentials:true});
            setTours(response.data.data);
        } catch (error) {
            showBoundary(error.message);
        }
      }
    
      useEffect(() => {
        const getData = async () => await getTours();
        getData();
      }, []);
    return(
        <div>
            {tours.map((tour) => {
                return <p>{tour.name}</p>
            })}
        </div>
    );
}

export default ToursList;