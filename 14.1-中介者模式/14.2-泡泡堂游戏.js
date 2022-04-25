{
  // 双人泡泡堂
  function Player(name) {
    this.name = name;
    this.enemy = null; // 敌人
  }

  Player.prototype.win = function () {
    console.log(this.name + ": won");
  };

  Player.prototype.lose = function () {
    console.log(this.name + ": lost");
  };

  Player.prototype.die = function () {
    this.lose();
    this.enemy.win();
  };

  let player1 = new Player("小明");
  let player2 = new Player("小红");
  //   player1.enemy = player2;
  //   player2.enemy = player1;
  //   player1.die();
  // 小明: lost
  // 小红: won
}

//--------------------------------------------------------

{
  // 多人泡泡堂
  // 这种方式无疑很低效率
  //   player1.partners = [player1, player2, player3, player4];
  //   player1.enemies = [player5, player6, player7, player8];
  //   player5.partners = [player5, player6, player7, player8];
  //   player5.enemies = [player1, player2, player3, player4];

  let players = []; // 保存所有玩家
  function Player(name, teamColor) {
    this.partners = []; // 队友列表
    this.enemies = []; // 敌人列表
    this.state = "live"; // 玩家状态
    this.name = name;
    this.teamColor = teamColor; //队伍颜色
  }

  Player.prototype.win = function () {
    console.log(this.name + ": won");
  };

  Player.prototype.lose = function () {
    console.log(this.name + ": lost");
  };

  Player.prototype.die = function () {
    let all_dead = true; // 是否所有玩家都死亡
    this.state = "dead";

    for (let i = 0, partner; (partner = this.partners[i++]); ) {
      if (partner.state !== "dead") {
        // 如果还有队友没阵亡，游戏还没失败
        all_dead = false;
        break;
      }
    }

    if (all_dead === true) {
      this.lose();
      for (let i = 0, partner; (partner = this.partners[i++]); ) {
        partner.lose(); // 通知所有队友游戏失败
      }
      for (let i = 0, enemy; (enemy = this.enemies[i++]); ) {
        enemy.win(); // 通知所有敌人游戏胜利
      }
    }
  };

  let playerFactory = function (name, teamColor) {
    let newPlayer = new Player(name, teamColor);

    for (let i = 0, player; (player = players[i++]); ) {
      if (player.teamColor === newPlayer.teamColor) {
        // 如果是同一队玩家, 加入队友列表
        player.partners.push(newPlayer);
        newPlayer.partners.push(player);
      } else {
        // 不是同一队玩家，加入敌人列表
        player.enemies.push(newPlayer);
        newPlayer.enemies.push(player);
      }
    }

    players.push(newPlayer);
    return newPlayer;
  };

  let player1 = playerFactory("小明", "red"),
    player2 = playerFactory("小乖", "red"),
    player3 = playerFactory("小宏", "red");

  let player4 = playerFactory("小白", "blue"),
    player5 = playerFactory("小黑", "blue"),
    player6 = playerFactory("小牛", "blue");
  //   player1.die();
  //   player3.die();
  //   player2.die();
  //   小乖: lost;
  //   小明: lost;
  //   小宏: lost;
  //   小白: won;
  //   小黑: won;
  //   小牛: won;
}

//--------------------------------------------------------

{
  // 中介者模式
  function Player(name, teamColor) {
    this.state = "live"; // 玩家状态
    this.name = name;
    this.teamColor = teamColor; //队伍颜色
  }

  Player.prototype.win = function () {
    console.log(this.name + ": won");
  };

  Player.prototype.lose = function () {
    console.log(this.name + ": lost");
  };

  // 玩家死亡
  Player.prototype.die = function () {
    this.state = "dead";
    //给中介者发消息，玩家死亡
    playerDirector.reciveMessage("playerDead", this);
  };

  // 移除玩家
  Player.prototype.remove = function () {
    playerDirector.reciveMessage("removePlayer", this);
  };

  // 玩家换队
  Player.prototype.changeTeam = function (color) {
    playerDirector.reciveMessage("changeTeam", this, color);
  };

  let playerFactory = function (name, teamColor) {
    let newPlayer = new Player(name, teamColor);
    playerDirector.reciveMessage("addPlayer", newPlayer);
    return newPlayer;
  };

  let playerDirector = (function () {
    let players = {}, // 保存所有玩家
      operations = {}; // 中介者可以执行的操作

    operations.addPlayer = function (player) {
      let teamColor = player.teamColor;
      players[teamColor] = players[teamColor] || []; // 如果还没成立队伍，就新成立一个队伍
      players[teamColor].push(player); // 加入一个玩家
    };

    operations.removePlayer = function (player) {
      let teamColor = player.teamColor;
      teamPlayers = players[teamColor] || []; //该队伍所有玩家
      players[teamColor] = teamPlayers.filter((item) => item !== player); //移除玩家
    };

    operations.changeTeam = function (player, newTeamColor) {
      operations.removePlayer(player); // 从原来队伍移除
      player.teamColor = newTeamColor; // 改变自身的队伍颜色
      operations.addPlayer(player); // 添加到新队伍
    };

    operations.playerDead = function (player) {
      let teamColor = player.teamColor,
        teamPlayers = players[teamColor]; //玩家所在队伍

      let all_dead = true;

      for (let i = 0, player; (player = teamPlayers[i++]); ) {
        if (player.state !== "dead") {
          all_dead = false;
          break;
        }
      }

      if (all_dead === true) {
        // 全部死亡
        for (let i = 0, player; (player = teamPlayers[i++]); ) {
          player.lose(); // 所有玩家失败
        }
        for (let color in players) {
          if (color !== teamColor) {
            let teamPlayers = players[color];
            // 找出其他队伍玩家
            for (let i = 0, player; (player = teamPlayers[i++]); ) {
              player.win(); // 其他队伍胜利
            }
          }
        }
      }
    };

    let reciveMessage = function () {
      let message = [].shift.call(arguments);
      operations[message].apply(this, arguments);
    };

    return {
      reciveMessage,
    };
  })();

  let player1 = playerFactory("小明", "red"),
    player2 = playerFactory("小乖", "red"),
    player3 = playerFactory("小宏", "red");

  let player4 = playerFactory("小白", "blue"),
    player5 = playerFactory("小黑", "blue"),
    player6 = playerFactory("小牛", "blue");
  // player1.die();
  // player3.die();
  // player2.die();
  // 小明: lost
  // 小乖: lost
  // 小宏: lost
  // 小白: won
  // 小黑: won
  // 小牛: won

  // player1.remove();
  // player3.die();
  // player2.die();
  // 小乖: lost
  // 小宏: lost
  // 小白: won
  // 小黑: won
  // 小牛: won

  player1.changeTeam("blue");
  player2.die();
  player3.die();
  // 小乖: lost
  // 小宏: lost
  // 小白: won
  // 小黑: won
  // 小牛: won
  // 小明: won
}
