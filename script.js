const btnAlarm = document.querySelector("#btn-alarm");
const soundAlarm = document.querySelector("#sound-alarm");
let timerId = null;
const inputAlarmTime = document.querySelector("#input-alarm-time");

const inputPushTime = document.querySelector("#input-push-time");
const inputBellTime = document.querySelector("#input-bell-time");
let pushTimerId = null;
let bellTimerId = null;

const btnTimer = document.querySelector("#btn-timer");
btnAlarm.addEventListener("click", function () {
    // 【ストッパー】もしすでにタイマーが動いていたら、クリックで止める（OFFにする）
    if (timerId) {
        clearInterval(timerId); // タイマーを止める
        timerId = null;        // タイマーの記憶を消す
        soundAlarm.pause();    // 音を止める
        soundAlarm.currentTime = 0; // 音を最初に戻す
        // btnAlarm.textContent = "⏰ アラーム";
        btnAlarm.style.backgroundColor = ""; // 背景色リセット
        return; // 重要なストッパー（ここで処理を終了して新しいタイマーを作らせない）
    }

    // スイッチをON（緑＆文字を白にする）
    btnAlarm.style.backgroundColor = "pink";

    // 1秒ごとに「今の時刻」と「設定された時刻」を比べるループ処理を開始！
    timerId = setInterval(function () {
        // ① 現在の時刻を取得して「HH:MM」の文字の形にする
        const now = new Date();
        const currentHours = String(now.getHours()).padStart(2, '0');
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeString = `${currentHours}:${currentMinutes}`;

        // ② 画面の入力欄（input）で設定されている目標の時間（例: "07:00"）をリアルタイムに取得
        const targetTimeString = inputAlarmTime.value;

        // ③ もし「今の時間」が「設定した時間」と同じになったら音を鳴らす！
        if (currentTimeString === targetTimeString) {
            clearInterval(timerId); // 時間になったので調べるのをやめる
            soundAlarm.currentTime = 0;
            soundAlarm.play(); // 音を鳴らす

            // 5秒後に自動でスイッチをOFF（グレー）にする
            setTimeout(function () {
                btnAlarm.style.backgroundColor = "";
                timerId = null;
            }, 10000);
        }
    }, 1000); // 1秒ごとに今の時間をチェックする
});

const btnPush = document.querySelector("#btn-push");
const soundPush = document.querySelector("#sound-push");

btnPush.addEventListener("click", function () {
    // 【ストッパー】もしすでにタイマーが動いていたら、クリックで止める（OFFにする）
    if (pushTimerId) {
        clearInterval(pushTimerId);
        pushTimerId = null;
        soundPush.pause();
        soundPush.currentTime = 0;
        btnPush.style.backgroundColor = "";
        return;
    }
    // スイッチをON（赤 ※CSSで緑に変換される）にする
    btnPush.style.backgroundColor = "red";
    
    // 1秒ごとに時間を比べるタイマーを開始！
    pushTimerId = setInterval(function () {
        const now = new Date();
        const currentHours = String(now.getHours()).padStart(2, '0');
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeString = `${currentHours}:${currentMinutes}`;

        // ☎️電話音の入力欄（HTMLの「その他」の2番目、value="08:00" の input）を取得
        const targetTimeString = inputPushTime.value;

        // もし時間になったら音を鳴らす！
        if (currentTimeString === targetTimeString) {
            clearInterval(pushTimerId);
            soundPush.currentTime = 0;
            soundPush.play();

            // 5秒後に自動でスイッチをOFFにする
            setTimeout(function () {
                btnPush.style.backgroundColor = "";
                pushTimerId = null;
            }, 5000);
        }
    }, 1000);
});

const btnBell = document.querySelector("#btn-bell");
const soundBell = document.querySelector("#sound-bell");

btnBell.addEventListener("click", function () {
    // 【ストッパー】もしすでにタイマーが動いていたら、クリックで止める（OFFにする）
    if (bellTimerId) {
        clearInterval(bellTimerId);
        bellTimerId = null;
        soundBell.pause();
        soundBell.currentTime = 0;
        btnBell.style.backgroundColor = ""; // 背景色リセット（OFF）
        return;
    }

    // スイッチをON（黄色 ※CSSで緑に変換されます）にする
    btnBell.style.backgroundColor = "yellow";

    // 1秒ごとに時間を比べるタイマーを開始！
    bellTimerId = setInterval(function () {
        const now = new Date();
        const currentHours = String(now.getHours()).padStart(2, '0');
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeString = `${currentHours}:${currentMinutes}`;

        // 🔔鈴の音の入力欄（HTMLの「その他」の3番目、value="09:00" の input）を取得
        const targetTimeString = inputBellTime.value;

        // もし時間になったら音を鳴らす！
        if (currentTimeString === targetTimeString) {
            clearInterval(bellTimerId);
            soundBell.currentTime = 0;
            soundBell.play();

            // 5秒後に自動でスイッチをOFFにする
            setTimeout(function () {
                btnBell.style.backgroundColor = "";
                bellTimerId = null;
            }, 5000);
        }
    }, 1000);
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