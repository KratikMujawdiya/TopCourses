import React from "react";
import Navbar from  "./components/Navbar";
import Cards from "./components/Cards"
import Filter from "./components/Filter"
import { apiUrl, filterData  } from "./data";
import { useState,useEffect } from "react";
import Spinner from "./components/Spinner";
import {toast} from "react-toastify";


const App = () => { 
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      ///output -> 
      setCourses(output.data);
    }
    catch(error) {
        toast.error("Unable to fetch data form API");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">

      <div>
        <Navbar/>
      </div>

	  {/* backgroung color filter and cards dono par apply ho rha hai to humne ek div(card+filter) bna kar apply kar diya  */}
	  
      <div className="bg-bgDark2">

        <div>
          <Filter 
          filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">

        {
        (courses.length === 0 || Object.keys(courses).length === 0) ? 
        (<div>No Courses Found</div>) : 
        (loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>))
        }

          {/* {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          } */}
        </div>
      </div>


    </div>
  );
};

export default App;

//output ke andar jo ek key hai uska name bhi data hai , ab is data ka use cards ke liye karenge

///////////////////////////////////////////////////////////////////////////////////////////write by me

//data.js ke andar api(https://codehelp-apis.vercel.app/api/get-top-courses) ko google par paste karoge to data us data ko json formatter(https://jsonformatter.curiousconcept.com/#) par converte karoge to data milega jiske andar five array Development, Business, Design, Lifestyle ke milenge ye hi vo 5(4+1(data se all vala banega)) button hai jo UI par show hong aur card ke andar jo data likha hai vo mujhe API call se mil rha hai

//npm react toastify se website open vha par ek command likhi hai jisse hum "toast" ko install kar sakte hai

//Ek single line se multiple card bnana ho "map function" ka use karo so 5 buttuon ko create karne ke liye map ke andar filter pass karoge

//Yha par hum filters ke uper cards create karne to mujhe pehle filter ka data pass karna padega , filter ka data pass karne se pehle ,filter ka data create karna padega

