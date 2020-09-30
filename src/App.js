import React from "react";
import Club from "./Club";
import Search from "./Search";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: {},
            apiLoaded: false,
            searchText: "",
        };

        this.setSearchText = this.setSearchText.bind(this);
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.json())
            .then((res) => {
                this.setState({ apiData: res, apiLoaded: true });
            });
    }

    setSearchText(text) {
        this.setState({ searchText: text });
    }

    render() {
        let components = "Loading...";
        if (this.state.apiLoaded) {
            components = this.state.apiData
                .filter((project) =>
                    project.title.includes(this.state.searchText)
                )
                .map((project, i) => <Club key={i} clubName={project.title} />);
        }

        return (
            <div className="App">
                <Search
                    value={this.state.searchText}
                    onChange={this.setSearchText}
                />
                {components}
            </div>
        );
    }
}

export default App;
