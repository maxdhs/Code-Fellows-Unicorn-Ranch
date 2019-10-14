import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    locations: ["Pastures", "Barn", "Rainbow Meadows"],
    unicorns: [
      {
        id: 1,
        name: "Marveloso",
        location: "Pastures",
        color: "purple",
        favoriteFood: "Crystal Berries"
      },
      {
        id: 2,
        name: "Mazar",
        location: "Barn",
        color: "Irradescent",
        favoriteFood: "Pop Rocks"
      },
      {
        id: 3,
        name: "Wonderosa",
        location: "Rainbow Meadows",
        color: "White",
        favoriteFood: "Mangos"
      }
    ]
  };

  handleEditLocation = id => {
    const unicorn = this.state.unicorns.filter(unicorn => unicorn.id === id)[0];
    const locations = this.state.locations.filter(
      location => location !== unicorn.location
    );
    const location = locations[Math.floor(Math.random() * 2)];
    unicorn.location = location;
    this.setState({
      unicorns: this.state.unicorns.map(u => {
        return u.id === id ? unicorn : u;
      })
    });
  };

  render() {
    return (
      <div>
        <h1 style={styles.codeFellows}>Unicorns!</h1>
        <ul>
          {this.state.unicorns.map(unicorn => (
            <div key={unicorn.id}>
              <li>
                Unicorn name: {unicorn.name} <br></br>
                Unicorn color: {unicorn.color} <br></br>
                Unicorn location:{" "}
                <span onClick={() => this.handleEditLocation(unicorn.id)}>
                  {unicorn.location}
                </span>{" "}
                <br></br>
                Unicorn favoriteFood: {unicorn.favoriteFood} <br></br>
              </li>
              <br></br>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = {
  codeFellows: {
    fontSize: 20
  }
};

export default App;

// user stories:
// as a Ranch Hand Receptionist I want to know which unicorns are where to direct visitors to the proper location
// as a ranch hand i want to update unicorn locations as i move them so that the system has the most up to date information on unicorn locations (next item in array)
// refresh after changing data and refresh
// git commit starting and finishing
// css
