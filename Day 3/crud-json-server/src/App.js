import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lists from "./Lists";
import CreateList from "./CreateList";
import UpdateList from "./UpdateList";
import DeleteList from "./DeleteList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alldata: [], // Initialize alldata state
    };
  }

  componentDidMount() {
    // Fetch data when component mounts
    this.fetchData();
  }

  fetchData() {
    // Fetch data from API and set it in state
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ alldata: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Add updateList function to update the state after an item is updated
  updateList = (id, updatedData) => {
    const updatedList = this.state.alldata.map(item => {
      if (item._id === id) {
        return { ...item, ...updatedData };
      }
      return item;
    });

    this.setState({ alldata: updatedList });
  };

  navigateBackToList = () => {
    // Navigate back to the book list route
    window.location.href = "/";
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Lists alldata={this.state.alldata} updateList={this.updateList} fetchData={() => this.fetchData()} />}
          />
          <Route path="/books/create" element={<CreateList reloadLists={() => this.fetchData()} navigateBack={this.navigateBackToList} />} />
          <Route path="/books/update/:id" element={<UpdateList updateList={this.updateList} fetchData={() => this.fetchData()} navigateBack={this.navigateBackToList} />} />
          <Route path="/books/delete/:id" element={<DeleteList />} />
        </Routes>
      </Router>
    );
  }
}

export default App;