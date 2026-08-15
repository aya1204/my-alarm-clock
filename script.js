// const { useId } = require("react");

const btnAlarm = document.querySelector("#btn-alarm");
const soundAlarm = document.querySelector("#sound-alarm");
let timerId = null;
const inputAlarmTime = document.querySelector("#input-alarm-time");

const inputPushTime = document.querySelector("#input-push-time");
const inputBellTime = document.querySelector("#input-bell-time");
let pushTimerId = null;
let bellTimerId = null;
let isEditMode = false;
let currentEditingItem = null; // 現在編集中のアラーム要素を記憶する変数

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

// ==========================================
// 1. 使う部品をHTMLから持ってくる
// ==========================================
const btnAddHeader = document.querySelector(".plus-btn"); // 右上の「＋」ボタン
const addModal = document.querySelector("#add-modal");
const btnModalCancel = document.querySelector("#btn-modal-cancel");
const btnModalCheck = document.querySelector("#btn-modal-check");
const newAlarmTime = document.querySelector("#new-alarm-time");

// 1. 「＋」ボタンが押されたら、追加画面を表示する
btnAddHeader.addEventListener("click", function () {
    currentEditingItem = null;

    // 時間とラベルの初期値をセット（文字をクリアしてプレーズホルダーを表示させる）
    document.querySelector("#new-alarm-time").value = "09:00";
    document.querySelector("#new-alarm-label").value = "";

    const modalHeaderTitle = document.querySelector("#add-modal .modal-header-title");
    if (modalHeaderTitle) modalHeaderTitle.textContent = "アラームを追加";
    if (deleteContainer) deleteContainer.style.display = "none";
    addModal.classList.add("show");
});

// 2. 「キャンセル」ボタンが押されたら追加画面を閉じる
btnModalCancel.addEventListener("click", function () {
    addModal.classList.remove("show");
});

// 3. 「確認（✔︎）」ボタンが押された時の処理
btnModalCheck.addEventListener("click", function () {
    // ①モーダルから設定された値（時間、ラベル）を取得する
    const timeValue = newAlarmTime.value; // 例: "09:00"
    const labelInput = document.querySelector("#new-alarm-label");
    const labelValue = labelInput.value.trim() !== "" ? labelInput.value.trim() : "アラーム"; // モーダルで指定した時間
    const soundTrigger = document.querySelector("#sound-select-trigger");
    const soundValue = soundTrigger ? soundTrigger.textContent : "アラーム"; // 選択されたサウンド名

    // 編集中の場合：既存のアラームを更新
    if (currentEditingItem) {
        const timeInput = currentEditingItem.querySelector("input[type='time']");
        const labelDiv = currentEditingItem.querySelector(".alarm-label");

        if (timeInput) timeInput.value = timeValue;
        if (labelDiv) labelDiv.textContent = labelValue;
        // {
        //     const currentLabel = labelDiv.textContent.trim();
        //     // もし「アラーム」なら入力欄は空にしておく（placeholderが表示される）
        //     document.querySelector("#new-alarm-label").value = (currentLabel === "アラーム") ? "" : currentLabel;
        // }

        currentEditingItem = null; // 編集終了
    }

    // 新規追加の場合：新しいアラームを作成
    else {
        const newAlarmItem = document.createElement("div");
        newAlarmItem.classList.add("alarm-item");

        // 編集モード中ならマイナスアイコンも一緒に作成
        const deleteIconHtml = isEditMode ? '<div class="delete-icon">-</div>' : '';

        newAlarmItem.innerHTML = `
            ${deleteIconHtml}
            <div class="alarm-left">
                <div class="alarm-time">
                    <input type="time" class="alarm-time" value="${timeValue}">
                </div>
                <div class="alarm-label">${labelValue}</div>
            </div>
            <button class="ios-switch"></button>
        `;

        const newSwitch = newAlarmItem.querySelector(".ios-switch");
        newSwitch.addEventListener("click", function () {
            if (newSwitch.style.backgroundColor === "pink") {
                newSwitch.style.backgroundColor = "";
            } else {
                newSwitch.style.backgroundColor = "pink";
            }
        });

        const alarmLists = document.querySelectorAll(".alarm-list");
        const otherAlarmList = alarmLists[1];
        if (otherAlarmList) {
            otherAlarmList.appendChild(newAlarmItem);
        }
    }

    labelInput.value = "";
    addModal.classList.remove("show");
});

// ==========================================
// 2. 🔁繰り返し設定の連動システム（同じ画面サイズ・全画面トグル版）
// ==========================================
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

// ==========================================
// 3. サウンド設定の連動システム（同じ画面サイズ・全画面トグル版）
// ==========================================
const soundTrigger = document.querySelector("#sound-select-trigger");
const soundModal = document.querySelector("#sound-modal");
const btnSoundBack = document.querySelector("#btn-sound-back");
const soundOptionItems = document.querySelectorAll("#sound-options-list li");

// 1. 「サウンド」の行をクリックしたら、同じサイズでサウンド画面をパッと開く
if (soundTrigger && soundModal) {
    soundTrigger.addEventListener("click", function () {
        soundModal.classList.add("show");
    });
}

// 2. 音リストをクリックしたときの処理（どれか１つを必ず選ぶ）
soundOptionItems.forEach(function (item) {
    item.addEventListener("click", function () {
        // 他のすべての音からチェック（selectedクラス）を外す
        soundOptionItems.forEach((i) => i.classList.remove("selected"));

        // 今クリックした音だけに新しくチェックをつける
        item.classList.add("selected");
    });
});

// 3. サウンド画面の「＜ 戻る」ボタンを押したら選択した音を保存して閉じる
if (btnSoundBack && soundModal) {
    btnSoundBack.addEventListener("click", function () {

        // 現在チェック（selected）がついている曜日があるか探す
        const selectedSound = document.querySelector("#sound-options-list li.selected");

        if (selectedSound) {
            // もしチェックが付いている音があればその文字（例：アラーム）を元の画面に表示する
            soundTrigger.textContent = selectedSound.textContent;
        }
        // 最後に、繰り返し画面を閉じて元の画面に戻る
        soundModal.classList.remove("show");
    });
}

// ==========================================
// 4. ⏰ スヌーズON/OFFとスクロールでスヌーズ時間設定
// ==========================================
const btnSnooze = document.querySelector("#btn-modal-snooze");
const snoozeDurationContainer = document.querySelector("#snooze-duration-container");
const snoozeWheel = document.querySelector("#snooze-wheel");
const snoozeValueText = document.querySelector("#snooze-value-text");

let isSnoozeOn = true;
let selectedSnoozeMinutes = 9; // デフォルトは9分

if (snoozeWheel) {
    const itemHeight = 36; // 1項目の高さ(px)
    const containerHeight = 110;
    const paddingTop = (containerHeight - itemHeight) / 2; // 中央に合わせるオフセット（37px）
    const minMinutes = 1;
    const maxMinutes = 15;

    // 1分〜15分のHTML作成
    for (let i = minMinutes; i <= maxMinutes; i++) {
        const item = document.createElement("div");
        item.classList.add("ios-picker-item");
        item.textContent = `${i} 分`;
        item.dataset.value = i;
        if (i === selectedSnoozeMinutes) {
            item.classList.add("selected");
        }
        snoozeWheel.appendChild(item);
    }

    // 指定の分数へホイールを動かす関数
    function scrollToMinute(minute) {
        selectedSnoozeMinutes = minute;
        const index = minute - minMinutes;
        const translateY = paddingTop - (index * itemHeight);
        snoozeWheel.style.transform = `translateY(${translateY}px)`;

        // 見た目の選択強調クラスの更新
        const items = snoozeWheel.querySelectorAll(".ios-picker-item");
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add("selected");
            } else {
                item.classList.remove("selected");
            }
        });

        // 選ばれた分数を「スヌーズの継続時間」の右側に即座に反映
        if (snoozeValueText) {
            snoozeValueText.textContent = `${selectedSnoozeMinutes}分`;
        }
    }

    // 初期位置にセット（9分）
    scrollToMinute(selectedSnoozeMinutes);

    // --- スクロール・ドラッグ操作のイベント処理 ---
    let startY = 0;
    let currentTranslateY = 0;
    let isDragging = false;

    const pickerContainer = document.querySelector(".ios-picker-container");

    // マウスホイールでのスクロール操作
    pickerContainer.addEventListener("wheel", function (e) {
        e.preventDefault();
        if (e.deltaY > 0 && selectedSnoozeMinutes < maxMinutes) {
            scrollToMinute(selectedSnoozeMinutes + 1);
        } else if (e.deltaY < 0 && selectedSnoozeMinutes > minMinutes) {
            scrollToMinute(selectedSnoozeMinutes - 1);
        }
    }, { passive: false });

    // タッチ・ドラッグ操作
    function getTranslateY() {
        const style = window.getComputedStyle(snoozeWheel);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.f;
    }

    pickerContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.pageY;
        currentTranslateY = getTranslateY();
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const deltaY = e.pageY - startY;
        snoozeWheel.style.transform = `translateY(${currentTranslateY + deltaY}px)`;
    });

    window.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false; // ここでドラッグを終了する
        const finalTranslateY = getTranslateY();
        const index = Math.round((paddingTop - finalTranslateY) / itemHeight);
        const clampedIndex = Math.max(0, Math.min(maxMinutes - minMinutes, index));
        scrollToMinute(clampedIndex + minMinutes);
    });
}

// スヌーズON/OFFと連動して非表示にする処理
if (btnSnooze && snoozeDurationContainer) {
    btnSnooze.addEventListener("click", function () {
        isSnoozeOn = !isSnoozeOn;

        if (isSnoozeOn) {
            btnSnooze.style.backgroundColor = "";
            snoozeDurationContainer.classList.add("snooze-disabled");
        }
    });
}

// ==========================================
// 5. 編集モード ＆ アラーム編集・削除機能
// ==========================================
const btnEditHeader = document.querySelector("#btn-edit-header");
const deleteContainer = document.querySelector("#delete-alarm-container");
const btnDeleteAlarm = document.querySelector("#btn-delete-alarm");

// 1. 「編集」ボタンを押したときの切り替え処理
if (btnEditHeader) {
    btnEditHeader.addEventListener("click", function () {
        isEditMode = !isEditMode;
        const alarmLists = document.querySelectorAll(".alarm-list");
        const otherAlarmList = alarmLists[1]; // 「その他」エリア

        if (isEditMode) {
            btnEditHeader.textContent = "完了";
            btnEditHeader.style.color = "#ff9f0a" // オレンジ色に
            if (otherAlarmList) otherAlarmList.classList.add("editing-mode");

            // 全てのアラーム行の左側に「赤いマイナスボタン」を挿入する（まだ無ければ）
            const items = otherAlarmList.querySelectorAll(".alarm-item");
            items.forEach((item) => {
                if (!item.querySelector(".delete-icon")) {
                    const deleteIcon = document.createElement("div");
                    deleteIcon.classList.add("delete-icon");
                    deleteIcon.textContent = "-";
                    item.insertBefore(deleteIcon, item.firstChild);
                }
            });
        } else {
            btnEditHeader.textContent = "編集";
            btnEditHeader.style.color = "";
            if (otherAlarmList) otherAlarmList.classList.remove("editing-mode");
        }
    });
}

// 2. 「＋」ボタンで新規追加を開いたときは「削除ボタン」を隠す
btnAddHeader.addEventListener("click", function () {
    currentEditingItem = null; // 編集モード解除
    const modalHeaderTitle = document.querySelector("#add-modal .modal-header-title");
    if (modalHeaderTitle) modalHeaderTitle.textContent = "アラームを追加";
    if (deleteContainer) deleteContainer.style.display = "none"; // 削除ボタンを隠す
    addModal.classList.add("show");
});

// 3. アラーム行をクリックしたときの処理（編集モード時のみ開く）
document.addEventListener("click", function (e) {
    // クリックされた場所が「その他」のalarm-itemの中かチェック
    const alarmItem = e.target.closest(".alarm-list.editing-mode .alarm-item");
    if (!alarmItem) return;

    // ①赤い「マイナスボタン（.delete-icon）」が押された場合は、その場で即削除
    if (e.target.classList.contains("delete-icon")) {
        alarmItem.remove();
        return;
    }

    // ②それ以外の場所（行全体）が押された場合は編集モーダルを開く
    currentEditingItem = alarmItem; // 編集対象のアラームを記録

    // 既存のデータを取得してモーダルにセットする
    const timeInput = alarmItem.querySelector("input[type='time']");
    const labelDiv = alarmItem.querySelector(".alarm-label");

    if (timeInput) {
        document.querySelector("#new-alarm-time").value = timeInput.value;
    }

    if (labelDiv) {
        const currentLabel = labelDiv.textContent.trim();

        if (currentLabel === "アラーム") {
            document.querySelector("#new-alarm-label").value = "";
        } else {
            document.querySelector("#new-alarm-label").value = currentLabel;
        }
    }

    // タイトルを「アラームを編集」に変更し、削除ボタンを表示
    const modalHeaderTitle = document.querySelector(
    "#add-modal .modal-header-title",
    );
    if (modalHeaderTitle) modalHeaderTitle.textContent = "アラームを編集";
    if (deleteContainer) deleteContainer.style.display = "block";

    addModal.classList.add("show");
});

// 4. 「アラームを削除」ボタンが押された時
if (btnDeleteAlarm) {
    btnDeleteAlarm.addEventListener("click", function () {
        if (currentEditingItem) {
            currentEditingItem.remove(); // 画面からアラーム要素を消す
            currentEditingItem = null;
        }
        addModal.classList.remove("show"); // モーダルを閉じる
    });
}

// ==========================================
// 🛌 睡眠|起床時間の変更処理
// ==========================================

// 要素の取得
const btnSleepChange = document.querySelector("#btn-sleep-change");
const sleepModal = document.querySelector("#sleep-modal");
const btnSleepCancel = document.querySelector("#btn-sleep-cancel");
const btnSleepSave = document.querySelector("#btn-sleep-save");

const inputBedTime = document.querySelector("#input-bed-time");
const inputWakeTime = document.querySelector("#input-wake-time");
const modalSleepDuration = document.querySelector("#modal-sleep-duration");

const displayWakeTime = document.querySelector("#display-wake-time");

// １．就寝・起床時刻から睡眠時間を計算する関数（日またぎ処理）
function calculateSleepDuration(bedTimeStr, wakeTimeStr) {
    if (!bedTimeStr || !wakeTimeStr) return "0時間0分";

    const [bedH, bedM] = betTimeStr.split(":").map(Number);
    const [wakeH, wakeM] = wakeTimeStr.split(":").map(Number);

    let bedTotalMinutes = bedH * 60 + bedM;
    let wakeTotalMinutes = wakeH * 60 + wakeM;

    // 起床時刻が就寝時刻以下の場合は「翌日」として24時間（1440）分足す
    if (wakeTotalMinutes <= bedTotalMinutes) {
        wakeTotalMinutes += 24 * 60;
    }

    const diffMinutes = wakeTotalMinutes - bedTotalMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}時間${minutes}分`;
}

// ２．モーダル内の予定睡眠時間テキストを更新
function updateModalSleepDuration() {
    if (inputBedTime && inputWakeTime && modalSleepDuration) {
        const duration = calculateSleepDuration(inputBedTime.value, inputWakeTime.value);
        modalSleepDuration.textContent = duration;
    }
}

// 入力欄の値が変わったらリアルタイムで計算更新
if (inputBedTime && inputWakeTime) {
    inputBedTime.addEventListener("change", updateModalSleepDuration);
    inputWakeTime.addEventListener("change", updateModalSleepDuration);
}

// ３．「変更」ボタンを押した時にモーダルを開く
if (btnSleepChange) {
    btnSleepChange.addEventListener("click", function () {
        // メイン画面の起床時間をモーダルの起床時間にセット
        if (displayWakeTime && inputWakeTime) {
            inputWakeTime.value = displayWakeTime.textContent.trim();
        }

        // 睡眠時間の表示を更新
        updateModalSleepDuration();

        // モーダルを表示
        sleepModal.classList.add("show");
    });
}

// ４．キャンセルボタン（×）で閉じる
if (btnModalCancel) {
    btnSleepCancel.addEventListener("click", function () {
        sleepModal.classList.remove("show");
    });
}

// ５．チェックボタン（✔︎）で保存して画面の起床時間を更新
if (btnSleepSave) {
    btnSleepSave.addEventListener("click", function () {
        if (inputWakeTime && displayWakeTime) {
            // メイン画面の起床時間（div）をモーダルで選んだ値に更新
            displayWakeTime.textContent = inputWakeTime.value;
        }

        // モーダルを閉じる
        sleepModal.classList.remove("show");
    });
}