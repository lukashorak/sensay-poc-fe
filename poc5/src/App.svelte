<script>
  import { Route, router, meta } from "tinro";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import ExerciseDetail from "./exercise/ExerciseDetail.svelte";
  import LessonSelection from "./lesson/LessonSelection.svelte";
  import LoginComponent from "./login/LoginComponent.svelte";

  import { userLogin, userToken, pin, pinFromUrl } from "./utilities/DataStore";
  import { getCookie, generateUUID, setCookie } from "./utilities/Utils.svelte";
  import TopHeaderComponent from "./utilities/TopHeaderComponent.svelte";

  router.mode.hash();

  onMount(async () => {
    initKeyFromUrl();
    initUserName();
  });

  function initKeyFromUrl() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    $pin = url.searchParams.get("key");
    if ($pin) {
      $pinFromUrl = true;
      console.log("pinFromUrl", $pinFromUrl);
    }
    console.log("pin", $pin);
  }

  function initUserName() {
    $userToken = getCookie("shuoshuoToken");
    $userLogin = getCookie("shuoshuoUserName");

    if (!$userToken){
      $userToken = generateUUID();
      setCookie("shuoshuoToken", $userLogin, 30);
    }
    if (!$userLogin){
      router.goto("/");
    }
  }
</script>

<Route>
  <Route path="/" fallback>
    <LoginComponent />
  </Route>
  <Route path="/lesson/:lessonId" let:meta>
    <TopHeaderComponent lessonId={meta.params.lessonId} />
    <LessonSelection
      lessonId={meta.params.lessonId}
    />
  </Route>

  <Route path="/lesson/:lessonId/exercise/:exercisePin" let:meta>
    <TopHeaderComponent
      lessonId={meta.params.lessonId}
      exercisePin={meta.params.exercisePin}
    />
    <ExerciseDetail
      exercisePin={meta.params.exercisePin}
    />
  </Route>

  <Route path="/exercise/:exercisePin" let:meta>
    <TopHeaderComponent exercisePin={meta.params.exercisePin} />
    <ExerciseDetail
      exercisePin={meta.params.exercisePin}
    />
  </Route>
</Route>
