<script>
  import { router } from "tinro";
  import { createEventDispatcher, onMount } from "svelte";

  import { userLogin, userToken, pin, pinFromUrl } from "../utilities/DataStore";

  export let lessonId;

  let lessonStatus = "NEW";
  let lessonData;

  onMount(async () => {
    loadData();
  });

  function loadData() {
    lessonStatus = "LOADING";
    fetch(
      `https://sensay.tw/public/api/lessons/` +
      lessonId +
        `/?studentToken=` +
        $userToken
    )
      .then((response) => {
        if (!response.ok) {
          console.log("response error");

          throw new Error("Network response was not ok");
        }
        console.log("response ok", response);
        return response.json();
      })
      .then((data) => {
        lessonData = data;

        console.log("lessonData", lessonData);
        lessonStatus = "OK";
      })
      .catch((error) => {
        console.log("catch error", error);
        errorMsg = "Error loading lesson";
        lessonData = undefined;
        lessonStatus = "ERROR";
      });
  }

  function openExercise(exerciseKey) {
    console.log("openExercise", exerciseKey);
    router.goto("lesson/"+lessonId+"/exercise/" + exerciseKey);
  }
</script>

<div class="container">
  <div class="row align-items-center">
    <div class="col">
      <div class="lesson-title">
        {#if Array.isArray(lessonData) && lessonData.length > 0}
          {lessonData[0].lessonName}
        {/if}
      </div>
    </div>
    <div class="col-auto lesson-detail-box">
      <div class="lesson-detail float-right">
        <p>Class: {lessonId}</p>
        <div>{$userLogin}</div>
      </div>
    </div>
  </div>

  <div class="card-group">
    {#if lessonStatus === "NEW"}
      Loading
    {:else if lessonStatus === "LOADING"}
      Loading
    {:else if lessonStatus === "ERROR"}
      Error loading lesson
    {:else}
      {#each lessonData as l, i}
        <div
          class="cardHover"
          class:done={l.overallScore != null}
          style="min-width: 240px; max-width: 33%"
          on:click={(x) => {
            openExercise(l.exerciseKey);
          }}
        >
          <div class="card-body">
            <h4 class="card-title">{l.exerciseTitle}</h4>
            <p class="card-text">
              {#if l.overallScore}Score: {l.overallScore}
              {:else}Try!
              {/if}
            </p>
            <div>
              <small>
                {l.exerciseType}
              </small>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>


@media (max-width: 768px) { 
  .lesson-detail-box {
    display: none;
  }
}

  .card-group{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .lesson-title {
    font-weight: 600;
    font-size: large;
  }

  .lesson-detail {
    border: 1px;
    border-color: #9d9fa2;
    border-style: solid;
    border-radius: 5px;
    margin: 0.5em;
    padding: 0.5em;
  }

  .cardHover {
    cursor: pointer;
    margin: 0.5em;
    border: 2px;
    border-color: #047f73ff;
    border-style: solid;
    border-radius: .35rem;
    box-shadow: 2px 2px 1px rgb(192, 187, 187);
  }

  .cardHover:hover {
    border-color: #ffcc07ff;
    box-shadow: 0px;
  }

  .done {
    color: #f4f4f4;
    border-color: #00a094ff;
    background-color: #00a094ff;
    box-shadow: none;
  }
</style>
