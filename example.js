var cards = {
    suspects: ["Peacock", "Green", "Plum", "Scarlet", "Mustard", "White"], 
    weapons: ["Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench"],
    rooms: ["Conservatory", "Billiard Room", "Ballroom", "Library", "Lounge", "Study", "Hall", "Kitchen", "Dining Room"],
    masterList: ["Peacock", "Green", "Plum", "Scarlet", "Mustard", "White",
                "Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench",
                "Conservatory", "Billiard Room", "Ballroom", "Library", "Lounge", "Study", "Hall", "Kitchen", "Dining Room"]
}

var answer = {
    suspect: "", 
    weapon: "", 
    room: "",
    playerCards: [[], [], [], [], [], []]
}

var state = {
    noteRowNum: 0,
    nextPlayer: 0
}

function toggleColor(uiElement){
    let currentColor = uiElement.css("background-color");
    if (currentColor == "rgb(255, 255, 255)") {
        uiElement.css("background-color","rgb(255, 0, 0)");
    }
    else if (currentColor == "rgb(255, 0, 0)"){
        uiElement.css("background-color","rgb(0, 200, 0)");
    }
    else if (currentColor == "rgb(0, 200, 0)"){
        uiElement.css("background-color","rgb(0, 0, 0)");
    }
    else if (currentColor == "rgb(0, 0, 0)"){
        uiElement.css("background-color","rgb(255, 255, 255)");
    }
}

function generateClue(){
    state.nextPlayer = ((state.nextPlayer) % 6) + 1;
    player = state.nextPlayer;
    x = getRandInt(0, 5);
    s = cards.suspects[x];
    x = getRandInt(0, 5);
    w = cards.weapons[x];
    x = getRandInt(0, 8);
    r = cards.rooms[x];
    req = [s, w, r];
    qlist = [];
    for (qn=0; qn<5; qn++) {
        q = ((player + qn)%6)+1;
        if (!(hasCard(q, req))) {
            qlist.push(q);
            if (qn == 4) {
                qlist.push("x");
            }
        }
        else {
            qlist.push(q);
            break;
        }
    }
    addClue(player, qlist, req);
}

function hasCard(q, req) {
    has = false;
    for (i=0; i<3; i++) {
        for (j=0; j<3; j++) {
            if (answer.playerCards[q-1][i] == req[j]) {
                has = true;
                break;
            }
        }
    }
    return has;
}

function checkAnswer(){
    if (answer.suspect == $("#answerSuspect").val() && answer.weapon == $("#answerWeapon").val() && answer.room == $("#answerRoom").val()) {
        alert("Yay! You won!")
    }
    else {
        alert("Oops! Try again!")
    }
}

function addNote(num) {
    var id = "noteSelect" + state.noteRowNum
    var add = '<tr id =  "' + id + '"><td><select class="suspectList"></select>'+
            '</td><td><select class="weaponList"></select>'+
            '</td><td><select class="roomList"></select></td></tr>'
    //$("#notes"+num+" tbody").append(add);
    var x = $("#notes"+num+" tbody").append(add);
    //debugger;
    fillSelectList($("#notes"+num+" #" + id + " .suspectList"), "suspects")
    fillSelectList($("#notes"+num+" #" + id + " .weaponList"), "weapons")
    fillSelectList($("#notes"+num+" #" + id + " .roomList"), "rooms")
    state.noteRowNum++;
}

function addClue(p, qlist, req) {
    qAdd = "";
    for (i=0; i<qlist.length; i++) {
        qAdd = qAdd + qlist[i] + " ";
    }
    var add = '<tr><td>'+ p +
            '</td><td>' + qAdd + 
            '</td><td>' + req[0] +
            '</td><td>' + req[1] + 
            '</td><td>' + req[2] + 
            '</td></tr>'
    $("#clueTable tbody").append(add);

}

function fillSelectList(uiElement, type) {
    s = '<option value=""></option>'
    for (i=0; i<cards[type].length; i++) {
        s = s + '<option value="' + cards[type][i] + '">' + cards[type][i] + '</option>'
    }
    uiElement.html(s);
}

function fillCardSelect(uiElement) {
    s = '<option value=""></option>'
    for (i=0; i<cards.suspects.length; i++) {
        s = s + '<option value="' + cards.suspects[i] + '">' + cards.suspects[i] + '</option>'
    }
    for (i=0; i<cards.weapons.length; i++) {
        s = s + '<option value="' + cards.weapons[i] + '">' + cards.weapons[i] + '</option>'
    }
    for (i=0; i<cards.rooms.length; i++) {
        s = s + '<option value="' + cards.rooms[i] + '">' + cards.rooms[i] + '</option>'
    }
    uiElement.html(s);
}

function createAnswer() {
    var masterList = ["Peacock", "Green", "Plum", "Scarlet", "Mustard", "White",
                "Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench",
                "Conservatory", "Billiard Room", "Ballroom", "Library", "Lounge", "Study", "Hall", "Kitchen", "Dining Room"]
    var x = getRandInt(12, 20);
    answer.room = masterList[x];
    masterList.splice(x, 1);
    x = getRandInt(6, 11);
    answer.weapon = masterList[x];
    masterList.splice(x, 1);
    x = getRandInt(5, 0);
    answer.suspect = masterList[x];
    masterList.splice(x, 1);
    for (i=0; i<3; i++) {
        x = getRandInt(0, masterList.length-1);
        answer.playerCards[0].push(masterList[x]);
        masterList.splice(x, 1);
        x = getRandInt(0, masterList.length-1);
        answer.playerCards[1].push(masterList[x]);
        masterList.splice(x, 1);
        x = getRandInt(0, masterList.length-1);
        answer.playerCards[2].push(masterList[x]);
        masterList.splice(x, 1);
        x = getRandInt(0, masterList.length-1);
        answer.playerCards[3].push(masterList[x]);
        masterList.splice(x, 1);
        x = getRandInt(0, masterList.length-1);
        answer.playerCards[4].push(masterList[x]);
        masterList.splice(x, 1);
        x = getRandInt(0, masterList.length-1);
        answer.playerCards[5].push(masterList[x]);
        masterList.splice(x, 1);
    }
    alert("S:" + answer.suspect + 
        "\nW:" + answer.weapon + 
        "\nR:" + answer.room + 
        "\np1:" + answer.playerCards[0] +
        "\np2:" + answer.playerCards[1] +
        "\np3:" + answer.playerCards[2] +
        "\np4:" + answer.playerCards[3] +
        "\np5:" + answer.playerCards[4] +
        "\np6:" + answer.playerCards[5])

}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function() {

    $(".cell").click(function() {
        toggleColor($(this));
    });

    $("#getAClue").click(function() {
        generateClue();
    });

    $("#checkAnswer").click(function() {
        checkAnswer();
    });

    $(".addNotes").click(function() {
        addNote($(this).data("num"));
    });

    createAnswer()

    fillSelectList($(".suspectList"), "suspects")
    fillSelectList($(".weaponList"), "weapons")
    fillSelectList($(".roomList"), "rooms")
    
    fillCardSelect($(".cards"))

    // var s = '<option value=""></option>'
    // for (i=0; i<cards.suspects.length; i++) {
    //     s = s + '<option value="' + cards.suspects[i] + '">' + cards.suspects[i] + '</option>'
    // }
    // $(".suspectList").html(s);

    // s = '<option value=""></option>'
    // for (i=0; i<cards.weapons.length; i++) {
    //     s = s + '<option value="' + cards.weapons[i] + '">' + cards.weapons[i] + '</option>'
    // }
    // $(".weaponList").html(s);

    // s = '<option value=""></option>'
    // for (i=0; i<cards.rooms.length; i++) {
    //     s = s + '<option value="' + cards.rooms[i] + '">' + cards.rooms[i] + '</option>'
    // }
    // $(".roomList").html(s);
    
});