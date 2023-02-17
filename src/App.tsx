import React from "react";
import $ from "jquery";

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  state = {
    score: 0,
    choice: 0,
  };

  componentDidMount() {
    $(".result").fadeOut();
  }

  visblityToggle = () => {
    $(".popup").fadeToggle();
  };

  getResult = (choice: number) => {
    // variables
    let choices = ["🤜", "✌", "🖐"];
    let randomValueNum = Math.floor(Math.random() * choices.length); // get random choice
    let randomValue = choices[randomValueNum];
    let gChoice_el = $(".game-choice"); // game choice element
    let gResult_el = $(".g-result"); // game result panel element
    let choice_el = $(".choice").eq(choice); // game choice element

    this.setState({ choice }); // set choice state

    choice_el.addClass("move"); // add moving animation
    $(".result").fadeIn(); // show result panel
    gChoice_el.text(randomValue); // add choice to

    // game conditions

    if (choice == randomValueNum) {
      gResult_el.text("Draw");
      return;
    }
    if (choice == 2 && randomValueNum == 0) {
      // if u is paper and c is rock
      gResult_el.text("You lose");
      this.setState({ score: this.state.score - 1 });
      gChoice_el.addClass("lost");
      choice_el.addClass("lost");
      return;
    }
    if (choice == 0 && randomValueNum == 2) {
      // if u is rock and c is paper
      gResult_el.text("You win");
      this.setState({ score: this.state.score + 1 });
      return;
    }
    if (choice < randomValueNum) {
      // if u is rock and c is cut or u is cut and c is paper
      gResult_el.text("You win");
      this.setState({ score: this.state.score + 1 });
      return;
    } else {
      gResult_el.text("You lose");
      this.setState({ score: this.state.score - 1 });
      gChoice_el.addClass("lost");
      choice_el.addClass("lost");
      return;
    }
  };

  playAgain = () => {
    $(".choice").eq(this.state.choice).removeClass("move").removeClass("lost");
    $(".game-choice").removeClass("lost");
    $(".result").fadeOut();
  };

  render() {
    return (
      <>
        <header>
          <h1 className="logo">Rock Paper Cut</h1>
          <p>
            score: <span id="score">{this.state.score}</span>
          </p>
        </header>
        <div className="game">
          <div className="result">
            <h1 className="g-result">YOU WIN</h1>
            <div className="choices">
              <div></div>
              <div className="game-choice"></div>
            </div>
            <button onClick={this.playAgain}>Play Again</button>
          </div>
          <div className="game-content">
            <button
              className="choice"
              onClick={() => {
                this.getResult(0);
              }}
            >
              🤜
            </button>
            <button
              className="choice"
              onClick={() => {
                this.getResult(1);
              }}
            >
              ✌
            </button>
            <button
              className="choice"
              onClick={() => {
                this.getResult(2);
              }}
            >
              🖐
            </button>
          </div>
        </div>
        <div className="popup" style={{ display: "none" }}>
          <div className="pop_content">
            <h1>Rock Paper Cut RULES</h1>
            <button className="hider" onClick={this.visblityToggle}>
              ×
            </button>
            <div className="pop_rule">
              <div>🖐</div>
              <div>✌</div>
              <div>🤜</div>
            </div>
          </div>
        </div>
        <button className="shower" onClick={this.visblityToggle}>
          RULES
        </button>
      </>
    );
  }
}

export default App;
