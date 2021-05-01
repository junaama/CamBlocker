alert("Hello from CamBlocker")

const init = () => {
    if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia(
        { video: true, audio: true },
        onSuccess,
        onFail
      );
    } else {
      alert("Camera is not available");
    }
  };
  
  const onSuccess = () => {};
  
  const onFail = () => {
    alert("Could not connect to stream. Please allow camera permission!");
  };
init();