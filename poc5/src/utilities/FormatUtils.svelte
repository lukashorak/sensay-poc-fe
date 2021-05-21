<script context="module">
  export function convertSecToMin(timeInSec) {
    let mins = ~~((timeInSec % 3600) / 60);
    let secs = ~~timeInSec % 60;
    let formattedTime = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    return formattedTime
  }
</script>
