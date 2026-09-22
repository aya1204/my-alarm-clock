document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. 編集モードの切り替え処理
    // ==========================================
    const btnEditHeader = document.querySelector("#btn-edit-header");
    const alarmLists = document.querySelectorAll(".alarm-list");

    if (btnEditHeader) {
        btnEditHeader.addEventListener("click", function () {
            alarmLists.forEach((list) => list.classList.toggle("editing-mode"));
            btnEditHeader.textContent =
            btnEditHeader.textContent === "編集" ? "✔︎" : "編集";
        });
    }

    // ==========================================
    // 2. スイッチ（ON/OFF）バインド関数
    // ==========================================

    // スヌーズ状態に応じた継続時間表示切り替え
    function updateSnoozeDisplay(snoozeSwitch) {
        const parentModal = snoozeSwitch.closest(".modal-content");
        if (!parentModal) return;
        const durationWrapper = parentModal.querySelector(".snooze-duration-wrapper");
        if (durationWrapper) {
            if (snoozeSwitch.classList.contains("active")) {
                durationWrapper.style.display = "block";
            } else {
                durationWrapper.style.display = "none";
            }
        }
    }

    // アラームスイッチ状態に応じたオプションカード表示切り替え
    function updateAlarmOptionsDisplay(alarmSwitch) {
        const optionsGroup = document.querySelector("#alarm-options-group");
        if (optionsGroup) {
            if (alarmSwitch.classList.contains("active")) {
                optionsGroup.style.display = "block";
            } else {
                optionsGroup.style.display = "none";
            }
        }
    }

    function bindSwitchEvent(sw) {
        sw.addEventListener("click", function (e) {
            e.stopPropagation(); // 行全体のクリックイベント発火を防ぐ
            this.classList.toggle("active");

            // スヌーズスイッチの変更時
            if (this.id.includes("btn-modal-snooze")) {
                updateSnoozeDisplay(this);
            }

            // 睡眠モーダルのメインアラームスイッチ変更時
            if (this.id === "alarm-toggle") {
                updateAlarmOptionsDisplay(this);
            }
        });
    }

    // 既存スイッチにイベント付与
    document.querySelectorAll(".ios-switch").forEach(bindSwitchEvent);

    // 初期状態の表示適用
    const alarmToggle = document.querySelector("#alarm-toggle");
    if (alarmToggle) updateAlarmOptionsDisplay(alarmToggle);

    document.querySelectorAll(".ios-switch[id*='btn-modal-snooze']").forEach(sw => {
        updateSnoozeDisplay(sw);
    });

    // ==========================================
    // 3. 音量スライダーの緑色ゲージ（背景）＆実際の音量更新処理
    // ==========================================
    const volumeSlider = document.querySelector("#alarm-volume-slider");

    // 画面上の全<audio>要素を取得
    const audioElements = document.querySelectorAll("audio");

    function updateVolumeSlider(slider) {
        if (!slider) return;
        const value = slider.value;
        const max = slider.max || 100;
        const percentage = (value / max) * 100;
        // 1. 見た目の緑色ゲージを変更
        slider.style.background = `linear-gradient(to right, #34c759 ${percentage}%, #3a3a3c ${percentage}%)`;
        // 2. 実際の音量を変更(0〜100の値を0.0〜1.0に変換)
        const volumeRatio = value / max;
        audioElements.forEach((audio) => {
            audio.volume = volumeRatio;
        });
    }

    if (volumeSlider) {
        // 画面読み込み時の初期表示設定
        updateVolumeSlider(volumeSlider);

        // スライダー操作時に緑色ゲージと音量を即座に更新
        volumeSlider.addEventListener("input", function () {
            updateVolumeSlider(this);
        });
    }

    // ==========================================
    // 4. サウンド選択モーダルの処理
    // ==========================================
    const soundTrigger = document.querySelector("#sound-select-trigger"); // アラーム追加側
    const sleepSoundTrigger = document.querySelector("#sleep-sound-trigger"); // 睡眠側
    const sleepPreviewText = document.querySelector("#sound-preview-text"); // 睡眠側のテキスト
    const soundModal = document.querySelector("#sound-modal");
    const btnSoundBack = document.querySelector("#btn-sound-back");
    const soundOptions = document.querySelectorAll("#sound-options-list li");

    // 触覚セクションの取得
    const hapticsSection = document.querySelector("#haptics-section");

    // その他のアラームのモーダルか、睡眠｜起床モーダルか、どちらからサウンドモーダルを開いたか保持する変数
    let currentSoundSource = "add";

    // アラーム追加側から開く
    if (soundTrigger && soundModal) {
        soundTrigger.addEventListener("click", () => {
            currentSoundSource = "add";
            if (hapticsSection) hapticsSection.style.display = "none"; // 触覚の選択する行を隠す
            soundModal.classList.add("show");
        });
    }

    // 睡眠｜起床モーダルから開く
    if (sleepSoundTrigger && soundModal) {
        sleepSoundTrigger.addEventListener("click", () => {
            currentSoundSource = "sleep"; // ソースを睡眠側にセット
            if (hapticsSection) hapticsSection.style.display = "block"; // 触覚を選択する行を表示
            soundModal.classList.add("show");
        });
    }

    if (btnSoundBack && soundModal) {
        btnSoundBack.addEventListener("click", () =>
            soundModal.classList.remove("show"),
        );
    }

    soundOptions.forEach((option) => {
        option.addEventListener("click", function () {
            soundOptions.forEach((el) => el.classList.remove("selected"));
            this.classList.add("selected");

            // どこから開かれたかによって更新対象を切り分ける
            if (currentSoundSource === "sleep") {
                // 睡眠側の表示更新（例：「アラーム　＞」や「電話音　＞」）
                if (sleepPreviewText) {
                    sleepPreviewText.textContent = `${this.textContent} ＞`;
                }
            } else {
                // アラーム追加側の表示更新
                if (soundTrigger) soundTrigger.textContent = this.textContent;
            }
            // 睡眠側の表示更新（例：「アラーム ＞」のように変更）
            if (soundModal) soundModal.classList.remove("show");
        });
    });

    // ==========================================
    // 5. アラーム項目のタップ（編集モード時モーダルを開く）
    // ==========================================
    const addModal = document.querySelector("#add-modal");
    const modalTitle = document.querySelector("#modal-title-text");
    const deleteBtnContainer = document.querySelector("#delete-alarm-container");
    const newAlarmTime = document.querySelector("#new-alarm-time");
    const newAlarmLabel = document.querySelector("#new-alarm-label");

    let currentEditingItem = null; // 現在編集中の要素を保持

    function bindItemClickEvent(item) {
        item.addEventListener("click", function (e) {
            if (e.target.classList.contains("ios-switch")) return;

            const parentList = this.closest(".alarm-list");

            // 編集モード時（editing-mode）のみモーダルを開く
            if (parentList && parentList.classList.contains("editing-mode")) {
            currentEditingItem = this; // 編集対象をセット

            const timeText = this.querySelector(".alarm-time");
            const labelText = this.querySelector(".alarm-label");

            if (timeText && newAlarmTime) {
                // 例："07:00" -> モーダル入力用に "07:00"（2桁）に整形してセット
                const [h, m] = timeText.textContent.trim().split(":");
                newAlarmTime.value = `${h.padStart(2, "0")}:${m}`;
            }

            // サウンド名の取得（要素のdata属性から取得、デフォルトは「アラーム」）
            const currentSound = this.dataset.sound || "アラーム";
            if (soundTrigger) soundTrigger.textContent = currentSound;

            // ラベルのセット（カスタムで入力されたラベルならその文字を入れ、サウンド名と同じか未設定なら空にする）
            if (labelText && newAlarmLabel) {
                const currentLabel = labelText.textContent.trim();
                // サウンド名と同じ、または「アラーム」などの場合は空欄にする（未設定扱い）
                if (currentLabel === currentSound || currentLabel === "アラーム") {
                newAlarmLabel.value = "";
                } else {
                newAlarmLabel.value = currentLabel;
                }
            }

            if (modalTitle) modalTitle.textContent = "アラームを編集";
            if (deleteBtnContainer) deleteBtnContainer.style.display = "block";
            if (addModal) addModal.classList.add("show");
            }
        });
    }

    // 既存の「その他」アラーム項目にクリックイベント設定
    document
    .querySelectorAll("#other-alarm-list .alarm-item")
    .forEach(bindItemClickEvent);

    // ==========================================
    // 6. アラームの新規追加 & 編集保存処理 (✔︎ボタン)
    // ==========================================
    const btnModalCheck = document.querySelector("#btn-modal-check");
    const otherAlarmList = document.querySelector("#other-alarm-list");

    if (btnModalCheck) {
        btnModalCheck.addEventListener("click", function () {
            const rawTime = newAlarmTime ? newAlarmTime.value : "09:00";
            const timeVal = rawTime.replace(/^0/, ""); // 先頭の0を削除（例：09:00 → 9:00）
            const soundVal = soundTrigger
            ? soundTrigger.textContent.trim()
            : "アラーム";

            // ★修正：入力欄が空のときのみサウンド名を採用し、入力されている場合はその文字を採用する
            const inputLabel = newAlarmLabel ? newAlarmLabel.value.trim() : "";
            const labelVal = inputLabel !== "" ? inputLabel : soundVal;

            if (
            modalTitle &&
            modalTitle.textContent === "アラームを編集" &&
            currentEditingItem
            ) {
            // --- 編集保存時 ---
            const timeText =
                currentEditingItem.querySelector(".alarm-time");
            const labelText = currentEditingItem.querySelector(".alarm-label");

            if (timeText) timeText.textContent = timeVal; // テキストを更新
            if (labelText) labelText.textContent = labelVal;
                currentEditingItem.dataset.sound = soundVal; // サウンド情報を保持
            } else {
            // --- 新規追加時 ---
            const newItem = document.createElement("div");
            newItem.className = "alarm-item";
            newItem.dataset.sound = soundVal; // サウンド情報を保持
            newItem.innerHTML = `
                    <div class="delete-icon">-</div>
                    <div class="alarm-left">
                        <div class="alarm-time">${timeVal}</div>
                        <div class="alarm-label">${labelVal}</div>
                    </div>
                    <button class="ios-switch active"></button>
                `;

            // 新しく作った要素にイベントをバインド
            const newSwitch = newItem.querySelector(".ios-switch");
            if (newSwitch) bindSwitchEvent(newSwitch);
            bindItemClickEvent(newItem);

            // リスト末尾に追加
            if (otherAlarmList) {
                otherAlarmList.appendChild(newItem);
            }
            }

            // モーダルを閉じる
            if (addModal) addModal.classList.remove("show");
        });
    }

    // ==========================================
    // 　7. アラームの削除処理 (削除ボタン)
    // ==========================================
    const btnDeleteAlarm = document.querySelector("#btn-delete-alarm");
    if (btnDeleteAlarm) {
        btnDeleteAlarm.addEventListener("click", function () {
            if (currentEditingItem) {
            currentEditingItem.remove();
            currentEditingItem = null;
            }
            if (addModal) addModal.classList.remove("show");
        });
    }

    // ==========================================
    // 8. モーダルの開閉処理（睡眠・追加）
    // ==========================================
    const sleepModal = document.querySelector("#sleep-modal");

    // 睡眠モーダルを開く
    const btnSleepChange = document.querySelector("#btn-sleep-change");
    if (btnSleepChange && sleepModal) {
        btnSleepChange.addEventListener("click", () =>
            sleepModal.classList.add("show"),
        );
    }

    // 睡眠モーダルの「×」ボタンで閉じる
    const btnSleepCancel = document.querySelector("#btn-sleep-cancel");
    if (btnSleepCancel && sleepModal) {
        btnSleepCancel.addEventListener("click", () =>
            sleepModal.classList.remove("show"),
        );
    }

    // 睡眠モーダルの「✔︎」ボタンで閉じる
    const btnSleepCheck = document.querySelector("#btn-sleep-check");
    const inputWakeTime = document.querySelector("#input-wake-time"); // 起床時間入力欄
    const displayWakeTime = document.querySelector("#display-wake-time"); // 元画面の表示エリア
    if (btnSleepCheck && sleepModal) {
        btnSleepCheck.addEventListener("click", () => {
            // 1．入力欄の値が存在し、かつ表示エリアが存在する場合
            if (inputWakeTime && displayWakeTime) {
                // 2．入力欄の値（6:30など）を表示エリアのテキストに代入する
                displayWakeTime.textContent = inputWakeTime.value.replace(/^0/, ""); // 先頭の0を削除（例：09:00 → 9:00）
            }
            // 3．モーダルを閉じる
            sleepModal.classList.remove("show");
        });
    }

    // 「＋」ボタンで追加モーダルを開く
    const plusBtn = document.querySelector(".plus-btn");
    if (plusBtn && addModal) {
        plusBtn.addEventListener("click", () => {
            currentEditingItem = null; // 新規追加なので編集対象をリセット
            if (modalTitle) modalTitle.textContent = "アラームを追加";
            if (deleteBtnContainer) deleteBtnContainer.style.display = "none";
            if (newAlarmTime) newAlarmTime.value = "09:00";
            if (newAlarmLabel) newAlarmLabel.value = "";
            if (soundTrigger) soundTrigger.textContent = "アラーム"; // 初期サウンド
            addModal.classList.add("show");
        });
    }

    // アラーム追加モーダルの「×」ボタンで閉じる
    const btnModalCancel = document.querySelector("#btn-modal-cancel");
    if (btnModalCancel && addModal) {
        btnModalCancel.addEventListener("click", () =>
            addModal.classList.remove("show"),
        );
    }

    // ==========================================
    // 9. 繰り返し選択モーダルの処理
    // ==========================================
    const repeatTrigger = document.querySelector("#repeat-select-trigger");
    const repeatModal = document.querySelector("#repeat-modal");
    const btnRepeatBack = document.querySelector("#btn-repeat-back");

    if (repeatTrigger && repeatModal) {
        repeatTrigger.addEventListener("click", () =>
            repeatModal.classList.add("show"),
        );
    }

    if (btnRepeatBack && repeatModal) {
        btnRepeatBack.addEventListener("click", () =>
            repeatModal.classList.remove("show"),
        );
    }

    const repeatOptions = document.querySelectorAll("#repeat-options-list li");
    repeatOptions.forEach((option) => {
        option.addEventListener("click", function () {
            this.classList.toggle("selected");
            const selected = Array.from(repeatOptions)
            .filter((el) => el.classList.contains("selected"))
            .map((el) => el.textContent.replace("毎", ""));

            if (repeatTrigger) {
            repeatTrigger.textContent =
                selected.length > 0 ? selected.join(" ") : "しない";
            }
        });
    });

    // ==========================================
    // 10. スヌーズ時間ホイールピッカーの初期化
    // ==========================================
    function setupSnoozePicker(containerElement) {
    if (!containerElement) return;

    const snoozeWheel = containerElement.querySelector(".ios-picker-wheel");
    const snoozeValueText =
        containerElement.querySelector(".snooze-value-text") ||
        (containerElement.parentElement
        ? containerElement.parentElement.querySelector(".snooze-value-text")
        : null);
    const pickerContainer = containerElement.querySelector(
        ".ios-picker-container",
    );

    if (!snoozeWheel || !pickerContainer) return;

    const itemHeight = 36;
    const containerHeight = 110;
    const paddingTop = (containerHeight - itemHeight) / 2;
    const minMinutes = 1;
    const maxMinutes = 15;
    let selectedSnoozeMinutes = 9;

    snoozeWheel.innerHTML = "";

    for (let i = minMinutes; i <= maxMinutes; i++) {
        const item = document.createElement("div");
        item.classList.add("ios-picker-item");
        item.textContent = `${i}分`;
        item.dataset.value = i;
        if (i === selectedSnoozeMinutes) {
            item.classList.add("selected");
        }
        snoozeWheel.appendChild(item);
    }

    function scrollToMinute(minute) {
        selectedSnoozeMinutes = minute;
        const index = minute - minMinutes;
        const translateY = paddingTop - index * itemHeight;
        snoozeWheel.style.transform = `translateY(${translateY}px)`;

        const items = snoozeWheel.querySelectorAll(".ios-picker-item");
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add("selected");
            } else {
                item.classList.remove("selected");
            }
        });

        if (snoozeValueText) {
        snoozeValueText.textContent = `${selectedSnoozeMinutes}分`;
        }
    }

    scrollToMinute(selectedSnoozeMinutes);

    pickerContainer.addEventListener(
        "wheel",
        function (e) {
            e.preventDefault();
            if (e.deltaY > 0 && selectedSnoozeMinutes < maxMinutes) {
                scrollToMinute(selectedSnoozeMinutes + 1);
            } else if (e.deltaY < 0 && selectedSnoozeMinutes > minMinutes) {
                scrollToMinute(selectedSnoozeMinutes - 1);
            }
            },
            { passive: false },
        );
    }

    document.querySelectorAll(".snooze-duration-wrapper").forEach((wrapper) => {
        setupSnoozePicker(wrapper);
    });

    // ==========================================
    // 11. 触覚選択モーダルの処理
    // ==========================================
    const hapticsTrigger = document.querySelector("#haptics-section .modal-row");
    const hapticsModal = document.querySelector("#haptics-modal");
    const btnHapticsBack = document.querySelector("#btn-haptics-back");
    const hapticsPreviewText = document.querySelector("#haptics-preview-text");
    const hapticsOptions = document.querySelectorAll("#haptics-options-list li");

    // 「触覚」行をクリックしたら触覚モーダルを開く
    if (hapticsTrigger && hapticsModal) {
        hapticsTrigger.addEventListener("click", () => {
            hapticsModal.classList.add("show");
        });
    }

    // 「＜」ボタンで触覚モーダルを閉じる
    if (btnHapticsBack && hapticsModal) {
        btnHapticsBack.addEventListener("click", () => {
            hapticsModal.classList.remove("show");
        });
    }

    // 触覚を選択した時の処理
    hapticsOptions.forEach((option) => {
        option.addEventListener("click", function () {
            // 選択状態（selectedクラス）の付け替え
            hapticsOptions.forEach((el) => el.classList.remove("selected"));
            this.classList.add("selected");

            // 表示テキストの更新（例：　「S.O.S.」）
            if (hapticsPreviewText) {
                hapticsPreviewText.textContent = `${this.textContent} ＞`;
            }

            // 触覚モーダルを閉じる
            if (hapticsModal) {
                hapticsModal.classList.remove("show");
            }
        });
    });
});