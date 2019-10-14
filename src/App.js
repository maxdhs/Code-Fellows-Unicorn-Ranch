import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    locations: ["Pastures", "Barn", "Rainbow Meadows"],
    unicorns: []
  };

  componentDidMount() {
    // fetch all the unicorns from the server on start:

    fetch("http://localhost:5000/unicorns")
      .then(resp => resp.json())
      .then(unicorns => {
        this.setState({
          unicorns
        });
      });
  }

  handleEditLocation = id => {
    //create the new updated unicorn object locally:

    const unicorn = this.state.unicorns.filter(
      unicorn => unicorn._id === id
    )[0];
    const locationIndex = this.state.locations.indexOf(unicorn.location);
    const nextLocation =
      locationIndex === this.state.locations.length - 1
        ? this.state.locations[0]
        : this.state.locations[locationIndex + 1];
    unicorn.location = nextLocation;

    //update unicorn on server and local state:

    axios
      .post(`http://localhost:5000/unicorns/update/${unicorn._id}`, unicorn)
      .then(resp => {
        this.setState({
          unicorns: this.state.unicorns.map(u => {
            return u.id === id ? unicorn : u;
          })
        });
      });
  };

  render() {
    return (
      <div>
        <div className="topnav">
          <a href="#home">Code Fellows Unicorn Ranch</a>
        </div>
        <ul>
          {this.state.unicorns.map(unicorn => (
            <div key={unicorn._id}>
              <li>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOIUmnfq0gucUKRSWztCX_jC6sQiaXwl7NYviV5ywtRTJO33mFNg"
                  style={{ height: 50, width: 50 }}
                  alt="a unicorn"
                />
                <h3>{unicorn.name}</h3>
                <p>
                  {unicorn.name} is a beautiful {unicorn.color} color. She is
                  currently fond of staying in the{" "}
                  <span
                    style={{ color: "blue", textDecoration: "underline" }}
                    onClick={() => this.handleEditLocation(unicorn._id)}
                  >
                    {unicorn.location}
                  </span>
                  {". "}
                  Her favorite food is {unicorn.favoriteFood}.
                </p>
              </li>
              <br></br>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
