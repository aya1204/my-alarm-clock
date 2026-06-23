const btnAlarm = document.querySelector("#btn-alarm");
const soundAlarm = document.querySelector("#sound-alarm");

// btnAlarm.addEventListener("click", function () {
//     // 音の再生を毎回最初（０）に戻す
//     soundAlarm.currentTime = 0;
//     // ボタンが押されたら音が鳴る
//     soundAlarm.play();
//     // ⏰アラーム音のボタンが押されたら背景がピンク色になる
//     btnAlarm.style.backgroundColor = "pink";
// });

let timerId = null;
const btnTimer = document.querySelector("#btn-timer");
btnAlarm.addEventListener("click", function () {
    if (timerId) {
        clearInterval(timerId); // タイマーを止める
        timerId = null;        // タイマーの記憶を消す
        soundAlarm.pause();    // 音を止める
        soundAlarm.currentTime = 0; // 音を最初に戻す
        btnAlarm.textContent = "⏰ アラーム";
        btnAlarm.style.backgroundColor = ""; // 背景色リセット
        return; // 重要なストッパー（ここで処理を終了して新しいタイマーを作らせない）
    }
  // 1. 画面にポップアップを出して、何秒後に鳴らすか数字を入力してもらう
  //     ※入力された数字は seconds という変数（let）に入ります
  let seconds = prompt(
    "⏰ アラーム音を何秒後に鳴らしますか？（半角数字で入力）",
  );

  // 2. もしキャンセルされたり、空っぽだったら処理を中断する
  if (!seconds) return;

  // 3. ボタンの文字を「◯秒後に鳴ります」に変える
  btnAlarm.textContent = `⏰ ${seconds}秒後に鳴ります`;

  // 1秒（1000ミリ秒）ごとに、中の関数をずっと繰り返すタイマーを起動
  timerId = setInterval(function () {
    // カウントを1減らす（3から2、2から1へ）
    seconds--;

    // まだ秒数があるなら
    if (seconds > 0) {
      // ボタンの文字を更新する
      btnAlarm.textContent = `⏰あと${seconds}秒`;
    } else {
      // 0秒になったら、繰り返しタイマーを完全にストップする
        clearInterval(timerId);

      // 1. まず画面に「⏰ 0！！！」と表示する
        btnAlarm.textContent = "⏰ 0！！！";

      // 2. 予定通りアラーム音を鳴らす
        soundAlarm.currentTime = 0;
        soundAlarm.play();
        
      // 3. ⏰アラーム音のボタンが押されたら背景がピンク色になる
        btnAlarm.style.backgroundColor = "pink";
        
        setTimeout(function () {
            if (btnAlarm.textContent === "⏰ 0！！！") {
                btnAlarm.textContent = "⏰ アラーム";
                timerId = null; // ⭐️ここをnullに戻しておかないと、次にボタンを押した時にまたストップ処理が走っちゃうので注意！
            }
        }, 5000);
    }
  }, 1000); // 1000ミリ秒ごと ＝ 1秒ごと
});

const btnPush = document.querySelector("#btn-push");
const soundPush = document.querySelector("#sound-push");

btnPush.addEventListener("click", function () {
    // 音の再生を毎回最初（０）に戻す
    soundPush.currentTime = 0;
    // ボタンが押されたら音が鳴る
    soundPush.play();
    // ☎️電話のボタンが押されたら背景がピンク色になる
    btnPush.style.backgroundColor = "red";
    // ☎️電話のボタンが押されたら文字が白色になる
    btnPush.style.color = "white";
});

const btnBell = document.querySelector("#btn-bell");
const soundBell = document.querySelector("#sound-bell");

btnBell.addEventListener("click", function () {
    // 音の再生を毎回最初（０）に戻す
    soundBell.currentTime = 0;
    // ボタンが押されたら音が鳴る
    soundBell.play();
    // 🛎️鈴の音ボタンが押されたら背景が黄色になる
    btnBell.style.backgroundColor = "yellow";
});


// 画面全体でキーボードが押された瞬間のイベントをキャッチする
window.addEventListener("keydown", function (event) {
    // もし長押し（連打）によるイベントだったらこれ以降の処理は無視して「何もしない」
    if (event.repeat) return;
    // もし押されたキーが「a」だったら
    if (event.key === "a") {
        soundAlarm.currentTime = 0;
        soundAlarm.play();
    }
     // もし押されたキーが「b」だったら
    if (event.key === "b") {
        soundPush.currentTime = 0;
        soundPush.play();
    }
     // もし押されたキーが「c」だったら
    if (event.key === "c") {
        soundBell.currentTime = 0;
        soundBell.play();
    }
})

window.addEventListener("keyup", function (event) {
    // もし「a」を離したら
    if (event.key === "a") {
        soundAlarm.pause();
    }
    // もし「b」を離したら
    if (event.key === "b") {
        soundPush.pause();
    }
    // もし「c」を離したら
    if (event.key === "c") {
        soundBell.pause();
    }
})

// const btnTimer = document.querySelector("#btn-timer");
// btnTimer.addEventListener("click", function() {
//   // わかりやすいようにボタンの文字を「セット中」に変える
//     btnTimer.textContent = "⌛️セット中．．．";

//   // 3秒(3000ミリ秒)後に中の関数を実行する
//     setTimeout(function (event) {
//         // 3秒経ったら鈴の音（soundBell）を鳴らす
//         soundBell.currentTime = 0;
//         soundBell.play();

//         // 音が鳴ったらボタンの文字を元に戻す
//         btnTimer.textContent = "⌛️ 3秒タイマー";
//   }, 3000); // ミリ秒単位で指定（3000 = 3秒）
// });

// // カウントダウン
// const btnTimer = document.querySelector("btn-timer");
// btnTimer.addEventListener("click", function () {
//     // 残り秒数を３秒にセット
//     let count = 3;

//     // 最初にリモコンの文字を「⏳ ３」にする
//     btnTimer.textContent = `⏳ ${count}`;

//     // 1秒（1000ミリ秒）ごとに、中の関数をずっと繰り返すタイマーを起動
//     const timerId = setInterval(function () {
//         // カウントを1減らす（3から2、2から1へ）
//         count--;

//         // まだ秒数があるなら
//         if (count > 0) {
//             // ボタンの文字を更新する
//             btnTimer.textContent = `⏳ ${count}`;
//         } else {
//             // 0秒になったら、繰り返しタイマーを完全にストップする
//             clearInterval(timerId);

//             // 鈴の音を鳴らす
//             soundBell.currentTime = 0;
//             soundBell.play();

//             // ボタンの文字を元に戻す
//             btnTimer.textContent = "⏳ 3秒タイマー";
//         }
//     }, 1000); // 1000ミリ秒 = 1秒ごと
// });

// const btnTimer = document.querySelector("#btn-timer");

// btnTimer.addEventListener("click", function () {
//     // 残り秒数を3秒にセット
//     let count = 3;

//     // 最初のリモコンの文字を「⏳ 3」にする
//     btnTimer.textContent = `⏳ ${count}`;

//     // 1秒（1000ミリ秒）ごとに、中の関数をずっと繰り返すタイマーを起動
//     const timerId = setInterval(function () {
//         // カウントを1減らす（3から2、2から1へ）
//         count--;

//         // まだ秒数があるなら
//         if (count > 0) {
//             // ボタンの文字を更新する
//             btnTimer.textContent = `⏳ ${count}`;
//         } else {
//             // 0秒になったら、繰り返しタイマーを完全にストップする
//             clearInterval(timerId);

//             // 鈴の音を鳴らす
//             soundBell.currentTime = 0;
//             soundBell.play();

//             // ボタンの文字を元に戻す
//             btnTimer.textContent = "⏳ 3秒タイマー";
//         }
//     }, 1000); // 1000ミリ秒ごと ＝ 1秒ごと
// })