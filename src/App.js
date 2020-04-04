import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ItemCount: 20,
      loading: false,
      users: undefined
    };
  }

  componentDidMount() {
    this.displayItems();
    var index = 1;
    this.refs.MyScrollRef.addEventListener("scroll", () => {
      if (
        this.refs.MyScrollRef.scrollTop + this.refs.MyScrollRef.clientHeight >=
        this.refs.MyScrollRef.scrollHeight
      ) {
        this.loadItems(++index);
      }
    });
  }

  displayItems = () => {
    this.setState({ loading: true });
    fetch(
      "https://randomuser.me/api?page=1&results=" +
        this.state.ItemCount +
        "&inc=name,phone"
    )
      .then(response => response.json())
      .then(data => this.setState({ users: data.results, loading: false }));
  };

  loadItems = pageIndex => {
    this.setState({ loading: true });
    fetch(
      "https://randomuser.me/api?page=" +
        pageIndex +
        "&results=" +
        this.state.ItemCount +
        "&inc=name,phone"
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: [...this.state.users, ...data.results],
          loading: false
        })
      );
  };

  render() {
    return (
      <div
        id="ScrollDiv"
        ref="MyScrollRef"
        className="App"
        style={{ height: "200px", overflow: "auto" }}
      >
        <div>
          {this.state.users &&
            this.state.users.map((val, index) => (
              <div key={index} className="wrapper">
                <div className="name">
                  {val.name.first} {val.name.last}
                </div>
                <div className="number">{val.phone}</div>
              </div>
            ))}
        </div>
        {this.state.loading ? <span>Loading...</span> : ""}
      </div>
    );
  }
}
