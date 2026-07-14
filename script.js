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

// 使う部品をHTMLから持ってくる
const btnAddHeader = document.querySelector(".plus-btn"); // 右上の「＋」ボタン
const addModal = document.querySelector("#add-modal");
const btnModalCancel = document.querySelector("#btn-modal-cancel");
const btnModalCheck = document.querySelector("#btn-modal-check");
const newAlarmTime = document.querySelector("#new-alarm-time");

// 1. 「＋」ボタンが押されたら、追加画面を表示する
btnAddHeader.addEventListener("click", function () {
    addModal.classList.add("show");
});

// 2. 「キャンセル」ボタンが押されたら追加画面を閉じる
btnModalCancel.addEventListener("click", function () {
  addModal.classList.remove("show");
});

// 3. 「確認」ボタンが押された時の処理
btnModalCheck.addEventListener("click", function () {
    // 画面を閉じる
    addModal.classList.remove("show");
});

// // 🔁繰り返し設定の連動システム
// const newAlarmRepeat = document.querySelector("#new-alarm-repeat");

// // ⭕️記憶を入れておく箱を１つだけ用意する（再代入するので必ずletにする）
//     let lastSelectedValue = "none";


// // ユーザーが選択を変えたときの処理
// newAlarmRepeat.addEventListener("change", function () {
//     const currentValue = newAlarmRepeat.value;

//     // ❌もし「今、選んだ曜日」が「直前と同じ曜日」なら選択を解除して「しない」に戻す
//     if (currentValue === lastSelectedValue) {
//         newAlarmRepeat.value = "none"; // 「しない」を選択状態にする
//         lastSelectedValue = "none";
//     } else {
//         // 違う曜日が選ばれたら、それを新しい記憶にする
//         lastSelectedValue = currentValue;
//     }
// });

// // 🔁繰り返し設定の連動システム（自作セレクト完全トグル版）
// const selectTrigger = document.querySelector("#repeat-select-trigger");
// const optionsList = document.querySelector("#repeat-options-list");
// const optionItems = document.querySelectorAll("#repeat-options-list li");

// // 内部的に選択されている値を保存する変数（最初は「しない」なので "none"）
// let currentSelectedValue = "none";

// // 1. 右側の文字（トリガー）をクリックしたら、選択肢リストを開閉する
// selectTrigger.addEventListener("click", function (event) {
//     event.stopPropagation(); // 画面クリックにイベントが流れるのを防ぐ
//     optionsList.classList.toggle("show");
// });

// // 2. 曜日リストの中の、どれかがクリックされた時の処理
// optionItems.forEach(function (item) {
//     item.addEventListener("click", function (event) {
//         event.stopPropagation();
        
//         const clickedValue = item.getAttribute("data-value"); // クリックされた曜日
//         const clickedText = item.textContent;                // 「毎月曜日」などの文字

//         // ❌ もしクリックした曜日が、すでに選ばれている曜日と「全く同じ」なら解除！
//         if (clickedValue === currentSelectedValue) {
//             selectTrigger.textContent = "しない";
//             currentSelectedValue = "none";
//             item.classList.remove("selected"); // チェック模様を消す
//         } else {
//             // ⭕️ 違う曜日が選ばれたら、その曜日を表示して記憶する
//             selectTrigger.textContent = clickedText;
//             currentSelectedValue = clickedValue;
            
//             // 他の曜日の選択色を消して、今選んだ曜日だけに色をつける
//             optionItems.forEach(i => i.classList.remove("selected"));
//             item.classList.add("selected");
//         }

//         // 選び終わったらリストを閉じる
//         optionsList.classList.remove("show");
//     });
// });

// // 3. 選択肢が開いている時に、画面の他の場所をクリックしたらリストを閉じる（親切設計）
// document.addEventListener("click", function (event) {
//     if (optionsList && !optionsList.contains(event.target) && event.target !== selectTrigger) {
//         optionsList.classList.remove("show");
//     }
// });

// 🔁繰り返し設定の連動システム（同じ画面サイズ・全画面トグル版）
const repeatTrigger = document.querySelector("#repeat-select-trigger");
const repeatModal = document.querySelector("#repeat-modal");
const btnRepeatBack = document.querySelector("#btn-repeat-back");
const repeatOptionItems = document.querySelectorAll("#repeat-options-list li");

// 1. 「繰り返し」の行をクリックしたら、同じサイズで専用画面をパッと開く
if (repeatTrigger && repeatModal) {
    repeatTrigger.addEventListener("click", function () {
        repeatModal.classList.add("show");
    });
}

// 2. 曜日リストの中の、どれかがクリックされたときの処理（ここでは画面を閉じない）
repeatOptionItems.forEach(function (item) {
    item.addEventListener("click", function () {
        // もしすでに選ばれている（selectedクラスがある）なら、クラスを消す（選択解除）
        if (item.classList.contains("selected")) {
            item.classList.remove("selected");
        } else {
            // まだ選ばれていないなら、他の曜日の選択を全部消してから、新しく選択状態にする
            repeatOptionItems.forEach((i) => i.classList.remove("selected"));
            item.classList.add("selected");
        }
    });
});

// 3. 専用画面の「＜ 戻る」ボタンを押したら値を保存して閉じる
if (btnRepeatBack && repeatModal) {
    btnRepeatBack.addEventListener("click", function () {

        // 現在チェック（selected）がついている曜日があるか探す
        const selectedItem = document.querySelector("#repeat-options-list li.selected");

        if (selectedItem) {
            // もしチェックが付いている曜日があればその文字（例：毎月曜日）を元の画面に表示する
            repeatTrigger.textContent = selectedItem.textContent;
        } else {
            // もし何もチェックがついていなければ（解除されていたら）「しない」にする
            repeatTrigger.textContent = "しない" ;
        }
        // 最後に、繰り返し画面を閉じて元の画面に戻る
        repeatModal.classList.remove("show");
    });
}