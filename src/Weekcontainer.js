import React from "react";
import DayCard from './DayCard'
import './Style.css'

class Weekcontainer extends React.Component {
  state = {
    fullData: [],
    dailyData: [],
  };
  
  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=673001,IN&units=imperial&APPID=1d76be173a98425b29f23fb15d758a46`;
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data List Loaded", data.list);

        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData,
          },
          () => console.log(this.state)
        );
      });
  };
  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) =>
     <DayCard reading={reading} key={index} />)
  }
  render() {
    return (
        <div className="container mt-5 pt-3 rounded" style={{boxShadow:"10px 2px 40px 5px rgb(53, 6, 53)",height:"450px"}}>
        <h1 className="display-1 jumbotron" >5-Day Forecast.</h1>
      
        <h5 className="display-5 text-muted">Calicut, IN</h5> 
         <h1><hr style={{color:"rgb(53, 6, 53)"}}/></h1>
          <div className="row justify-content-center">
  
            {this.formatDayCards()}
  
          </div>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <hr></hr>
        </div>
    );
  }
}

export default Weekcontainer;
