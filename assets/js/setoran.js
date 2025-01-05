let urlfile;
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

let chunks = [];
      let recorder;
      let blob = null;


      const recordButton = document.getElementById("record");
    //   const pauseButton = document.getElementById("pause");
      const stopButton = document.getElementById("stop");
    //   const saveButton = document.getElementById("save");

      recordButton.addEventListener("click", startRecording);
    //   pauseButton.addEventListener("click", pauseRecording);
      stopButton.addEventListener("click", stopRecording);
    //   saveButton.addEventListener("click", saveRecording);
        $("#stop").hide();
      async function startRecording() {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        recorder = new MediaRecorder(audioStream);

        recorder.start();
        recordButton.disabled = true;

        // pauseButton.disabled = false;
        stopButton.disabled = false;
        $("#record").hide();
        $("#stop").show();
        timer = true;
        stopWatch();
        recorder.addEventListener("dataavailable", function (event) {
          saveAsFile(event.data);
        //   var data = new FormData();
        //   var oReq = new XMLHttpRequest();
        //   oReq.open("POST", 'uploadsetoran.php', true);
        //   oReq.onload = function (oEvent) {
        //     console.log("Uploaded")
        //   };
          
        //   // const filerekaman = new Blob(blob, { type: "audio/wav" });
          
        //   oReq.setRequestHeader("Content-Type", "multipart/form-data");
        //   data.append('file', event.data);
        //   oReq.send(data);
        let reader = new FileReader();
        reader.readAsDataURL(event.data);
        reader.onloadend = function () {
        let base64String = reader.result;
        console.log('Base64 String - ', base64String);

        // Simply Print the Base64 Encoded String, 
         // without additional data: Attributes. 
         console.log('Base64 String without Tags- ',
         base64String.substr(base64String.indexOf(', ') + 1));
         
        } 
        });
      }
      function saveRecording(blob) {
        stopRecording();
        recorder.stop();
        
      }
      function saveAsFile(blob) {
        // blob = new Blob(chunks, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);

        addEntry(url);
        urlfile = url;
        return;
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "recording.ogg";
        a.click();
        window.URL.revokeObjectURL(url);
      }
      function pauseRecording() {
        if (recorder.state === "recording") {
          recorder.pause();
          pauseButton.innerHTML = "Resume";
        } else if (recorder.state === "paused") {
          recorder.resume();
          pauseButton.innerHTML = "Pause";
        }
      }
      function stopRecording() {
        
        recorder.stop();
        recordButton.disabled = false;
        // pauseButton.disabled = true;
        stopButton.disabled = true;
        timer = false;
      }

      function addEntry(url) {
        const entryContainer = document.createElement("li");
        const boxrec = document.getElementById("boxrecord");
        const entryContent = document.createElement("audio");
        entryContent.setAttribute("controls", "true");
        entryContent.setAttribute("class", "w-100");
        entryContent.src = url;

        boxrec.appendChild(entryContent);

        // const entryList = document.getElementById("audio-list");
        // entryList.appendChild(entryContainer);
      }

      function uploadsetoran() {
        var data = new FormData();
        var oReq = new XMLHttpRequest();
        oReq.open("POST", 'uploadsetoran.php', true);
        oReq.onload = function (oEvent) {
          console.log("Uploaded")
        };
        console.log(blob);
        // const filerekaman = new Blob(blob, { type: "audio/wav" });
        
        oReq.setRequestHeader("Content-Type", "multipart/form-data");
        data.append('file', filerekaman);
        oReq.send(data);
      }

      function stopWatch() {
        if (timer) {
            count++;
            if (count == 100) {
                second++;
                count = 0;
            }
            if (second == 60) {
                minute++;
                second = 0;
            }
            if (minute == 60) {
                hour++;
                minute = 0;
                second = 0;
            }
            let hourString = hour;
            let minuteString = minute;
            let secondString = second;
            let countString = count;
            if (hour < 10) {
                hourString = "0" + hourString;
            }
            if (minute < 10) {
                minuteString = "0" + minuteString;
            }
            if (second < 10) {
                secondString = "0" + secondString;
            }

            if (count < 10) {
                countString = "0" + countString;
            }
            document.getElementById('hour').innerText = hourString;
            document.getElementById('minute').innerTextL = minuteString;
            document.getElementById('second').innerText = secondString;
            document.getElementById('count').innerText = countString;
            setTimeout(stopWatch, 10);
        }
    }