import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        alldata: [],
        singledata: {
          title: "",
          author: ""
        }
      };
    }

    getLists = () => {
      fetch("http://localhost:5000/posts")
      .then(res => res.json())
      .then(result => 
        this.setState({
          loading: false,
          alldata: result
        })
      )
      .catch(console.log);
    }

    handleChange = (event) => {
      let title = this.state.singledata.title;
      let author = this.state.singledata.author;

      if (event.target.name === "title") title = event.target.value;
      else author = event.target.value;

      this.setState({
        singledata: {
          title: title,
          author: author
        }
      });
    }

    createList = () => {
      fetch("http://localhost:5000/posts")
        .then(res => res.json())
        .then(result => {
          const maxId = result.length > 0 ? Math.max(...result.map(item => item.id)) : 0;
          const newData = {
            ...this.state.singledata,
            id: maxId + 1
          };
    
          fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
          })
            .then(() => {
              // Update state after successful creation
              this.setState(prevState => ({
                singledata: { title: "", author: "" },
                alldata: [...prevState.alldata, newData],
                loading: false
              }));
            })
            .catch(console.error);
        })
        .catch(console.error);
    };   
    
    getList = (event, id) => {
      this.setState(
        {
          singledata: {
            title: "Loading...",
            author: "Loading..."
          }
        },
        () => {
          fetch("http://localhost:5000/posts/" + id)
            .then(res => res.json())
            .then(result => {
              this.setState({
                singledata: {
                  title: result.title,
                  author: result.author ? result.author : ""
                }
              });
            });
        }
      );
    }

    updateList = (id, updatedData) => {
      fetch(`http://localhost:5000/posts/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedData) // Send updated data from updatedData
      })
      .then(res => res.json())
      .then(result => {
          console.log("Item updated successfully:", result);
          this.setState({
              singledata: {
                  title: "",
                  author: ""
              }
          });
  
          // Reload the lists after successful update
          this.getLists();
      })
      .catch(error => {
          console.error("Error updating item:", error);
      });
    }
    
    deleteList = (event, id) => {
      fetch("http://localhost:5000/posts/" + id, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(result => {
          this.setState({
            singledata: {
              title: "",
              author: ""
            }
          });
          this.getLists();
        });
    }

    render() {
      const listTable = this.state.loading ? (
        <span>Loading Data......Please be patient.</span>
      ) : (
        <Lists 
          alldata={this.state.alldata}
          singledata={this.state.singledata}
          getList={this.getList}
          updateList={this.updateList} 
          reloadLists={this.getLists} // Pass the reloadLists function as a prop
          deleteList={this.deleteList}
          handleChange={this.handleChange}
        />
      );

      return (
        <div className="container">
          <span className="title-bar">
            <button type="button" className="btn btn-primary" onClick={this.getLists}>
              Get Lists
            </button>
            <CreateList 
              singledata={this.state.singledata}
              handleChange={this.handleChange}
              createList={this.createList} />
          </span>
          {listTable}
        </div>
      )
    }
  }

export default App;