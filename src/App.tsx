import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
  intervalId: NodeJS.Timeout | null,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false,  // Initialize showGraph as false
      intervalId: null,
    };
  }

  /**
   * Render Graph react component with state.data parsed as a property data
   */
  renderGraph() {
    // Conditionally render the graph based on the showGraph state
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
    return null; // Return null if showGraph is false (graph is hidden)
  }

  /**
   * Get new data from the server and update the state with the new data
   */
  getDataFromServer() {
    const intervalId = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: [...this.state.data, ...serverResponds],
          showGraph: true,  // Show the graph when data starts streaming
        });
      });
    }, 100); // Fetch data every 100ms

    this.setState({ intervalId });
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => { this.getDataFromServer() }}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
