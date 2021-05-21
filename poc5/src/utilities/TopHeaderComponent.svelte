<script>
  import { router } from "tinro";

  export let lessonId;
  export let exercisePin;

  function goHome() {
    router.goto("/");
  }

  function goLesson() {
    router.goto("/lesson/" + lessonId);
  }

  function goExercise() {
    if (lessonId) {
      router.goto("/lesson/" + lessonId + "/exercise/" + exercisePin);
    } else {
      router.goto("/exercise/" + exercisePin);
    }
  }
</script>

<div>
  <span on:click={goHome}>Home</span>

  {#if lessonId}
    <span style="padding-left:8px;" on:click={goLesson}>Lesson</span>
    {#if exercisePin}
      <span style="padding-left:8px;" on:click={goExercise}>Exercise</span>
    {/if}
  {:else if exercisePin}
    <span style="padding-left:8px;" on:click={goExercise}>Exercise</span>
  {/if}
</div>
