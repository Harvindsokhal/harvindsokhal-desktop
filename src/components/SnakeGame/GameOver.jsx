function GameOver(props) {
  return (
    <div
      id="GameBoard"
      style={{
        width: props.width,
        height: props.height,
        borderWidth: 0,
      }}
    >
      <div id="GameOver" style={{ fontSize: props.width / 15 }}>
        <div id="GameOverText">GAME OVER</div>
        <div id="YourScore">Your score: {props.score}</div>
        <div id="YourScore">
          {props.newHighScore ? 'New local ' : 'Local '}high score:{' '}
          {props.highScore}
        </div>
        <div id="PressSpaceText">Press Space to restart</div>
      </div>
    </div>
  )
}

export default GameOver
