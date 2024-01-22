let xName = $("#xName");
let oName = $("#oName");
let turn = "X";
let statDiv = $("#status");
let xPName = $("#playerX").val();
let oPName = $("#playerO").val();
let updates = $("#updates");
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let win = false;

// This function will be run whenever the new game button is clicked,
// it will add the player names written in the input,
//  as well as clear the board and intialize everything needed for a new game

$("#newGame").on("click", function () {
  xPName = $("#playerX").val();
  oPName = $("#playerO").val();

  if (!checkNames()) {
    return;
  }

  xName.text("X= " + xPName);
  oName.text("O= " + oPName);
  statDiv.html("");
  statDiv.append(statusUpdt());
  win = false;
  turn = "X";

  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  $(".box").html("");
});

//Check if names were given by players
function checkNames() {
  if (!xPName) {
    statDiv.html(
      '<div class="alert alert-danger mt-2" role="alert" id="gameOver">Please input Name for player X</div>'
    );
    return false;
  }
  if (!oPName) {
    statDiv.html(
      '<div class="alert alert-danger mt-2" role="alert" id="gameOver">Please input Name for player O</div>'
    );
    return false;
  }
  return true;
}

//Function below checks if someone won, or if all cells are used, it will show it's a draw

function isOver() {
  //Checks rows
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      console.log("xxx");
      return gameOver();
    }
  }
  //Mira si gana por COLUMNAS
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      console.log("xxx");
      return gameOver();
    }
  }
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    console.log("xxx");
    return gameOver();
  } else if (
    board[2][0] &&
    board[2][0] === board[1][1] &&
    board[2][0] === board[0][2]
  ) {
    console.log("xxx");
    return gameOver();
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        return;
      }
    }
  }

  statDiv.html(
    '<div class="alert alert-info mt-2" role="alert" id="gameOver">Game over! It\'s a draw!</div>'
  );
  win = true;
}

//This function will generate a message if a player wins

function gameOver() {
  let winner = "";

  win = true;

  if (turn === "X") {
    winner = oPName;
    turn = "O";
  } else {
    winner = xPName;
    turn = "X";
  }

  statDiv.empty();
  statDiv.append(
    '<div class="alert alert-info mt-2" role="alert" id="gameOver">Game over! player for \'' +
      turn +
      "': " +
      winner +
      " won!</div>"
  );
}

//This updates the status on top

function statusUpdt() {
  if (turn === "O") {
    statDiv.html(
      '<div class="alert alert-info mt-2" role="alert" id="turnAlert">It\'s ' +
        oPName +
        "'s turn.</div>"
    );
  } else {
    statDiv.html(
      '<div class="alert alert-info mt-2" role="alert" id="turnAlert">It\'s ' +
        xPName +
        "'s turn.</div>"
    );
  }
}

//This checks for clicks on cells

$(".box").on("click", function () {
  if (!checkNames()) {
    return;
  }
  let x = $(this).data("x");
  let y = $(this).data("y");

  if (board[x][y]) {
    return;
  }

  if (win) {
    return;
  }

  if (turn === "O") {
    $(this).html($('<img class="img-fluid">').attr("src", "/images/O.svg"));
    board[x][y] = 2;
    turn = "X";
    statusUpdt();
  } else {
    $(this).html($('<img class="img-fluid">').attr("src", "/images/X.svg"));
    board[x][y] = 1;
    turn = "O";
    statusUpdt();
  }

  isOver();

  console.log(board);
});

// DELETE STUFF FROM TOP AND PLAYERS AT THE END
// CREATE DIV AT TOP
// ADD INSTRUCTIONS
// SAY WHICH TURN IT IS IN status
