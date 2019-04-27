import './App.css';
import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Header/Nav";
import images from "./images.json";
import Card from "./components/Card";


class App extends Component {
  // Set this.state
  state = {
    images,
    message: "Click an image to begin!",
    score: 0,
    topScore: 0
  };

  handleClick = (id, clicked) => {
    const imagePosition = this.state.images;

    if (clicked) {
      imagePosition.forEach((image, i) => {
        imagePosition[i].clicked = false;
      });
      return this.setState({
        image: imagePosition.sort(() => Math.random() - 0.5),
        message: "You Guessed Incorrectly!",
        score: 0
      })
    }
    else {
      imagePosition.forEach((image, i) => {
        if (id === image.id) {
          imagePosition[i].clicked = true;
        }
      });

      const { topScore, score } = this.state;
      const newScore = score + 1;
      const newTopScore = newScore > topScore ? newScore : topScore;

      return this.setState({
        image: imagePosition.sort(() => Math.random() - 0.5),
        message: "You Guessed Correctly!",
        score: newScore,
        topScore: newTopScore,
      })
    }
  };

  render() {
    return (
      <div className="body">
        <Nav 
        message={this.state.message}
        score={this.state.score}
        topScore={this.state.topScore}/>
        <Header />
        <div className="container">
          <div className="row">
            {this.state.images.map(images => (
              <Card
                key={images.id}
                id={images.id}
                clicked={images.clicked}
                image={images.image}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

