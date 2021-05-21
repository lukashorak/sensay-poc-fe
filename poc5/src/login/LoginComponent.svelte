<script>
  import { router } from "tinro";
  import { onMount } from "svelte";
  import { setCookie } from "../utilities/Utils.svelte";
  import {
    compatibility,
    termsAndConditionOpen,
  } from "../utilities/DataStore.js";
  import TermsAndConditions from "./components/TermsAndConditions.svelte";

  import { userLogin, pin, pinFromUrl } from "../utilities/DataStore";

  let errorMsg = undefined;

  onMount(async () => {});

  async function login() {
    $userLogin = $userLogin.trim();

    console.log("click login", $pin, $userLogin);

    if ($pin && $pin != "" && userLogin && $userLogin != "") {
      if (Number($pin)) {
        setCookie("shuoshuoUserName", $userLogin, 30);
        router.goto("/lesson/" + $pin);
        return;
      }

      fetch(`https://sensay.tw/public/api/exercises/?key=` + $pin)
        .then((response) => {
          if (!response.ok) {
            console.log("response error");
            throw new Error("Network response was not ok");
          }
          console.log("response ok");
          return response.json();
        })
        .then((data) => {
          setCookie("shuoshuoUserName", $userLogin, 30);
          router.goto("/exercise/" + $pin);
        })
        .catch((error) => {
          console.log("catch error", error);
          errorMsg = "Missing PIN";
        });
    } else {
      errorMsg = "No PIN or Name";
    }
  }

  function resetPin() {
    console.log("resetPin");
    if ($pin) {
      $pin = undefined;
      $pinFromUrl = false;
      router.goto("/");
    }
  }
</script>

<TermsAndConditions />

<div class="login-clean">
  <form>
    <h2 class="sr-only">Login Form</h2>
    <div class="illustration" on:click={resetPin}>
      <img src="assets/img/logo_2.png" alt="logo" />
    </div>
    {#if $pinFromUrl}
      <div class="form-group"><p>PIN already provided ({$pin})</p></div>
    {:else}
      <p>Teacher should provide you with the PIN</p>
      <div class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="PIN"
          bind:value={$pin}
        />
      </div>
    {/if}
    <div class="form-group">
      <input
        class="form-control"
        type="text"
        placeholder="Enter your first and last name"
        bind:value={$userLogin}
      />
    </div>

    {#if $compatibility}
      <div class="form-group">
        <button
          class="btn btn-primary btn-block"
          type="submit"
          on:click|preventDefault={login}>Log In</button
        >
      </div>
    {:else}
      <div class="form-group">
        <button class="btn btn-danger btn-block" type="button" disabled
          >Error</button
        >
        <div class="alert alert-danger" role="alert">
          Due to technical limitations of iOS, Sensay only works directly in
          Safari. If you open as link from Line or FB please explicitly open it. <a
            href="https://www.oksensay.com/337-2/">Need help?</a
          >
        </div>
      </div>
    {/if}

    {#if errorMsg === "Missing PIN"}
      <div class="alert alert-danger" role="alert">
        This PIN doesn't exist, please check with your teacher.
      </div>
    {:else if errorMsg === "No PIN or Name"}
      <div class="alert alert-danger" role="alert">
        Please fill token and name.
      </div>
    {/if}

    <p on:click={() => termsAndConditionOpen.update((x) => true)}>
      Terms of Service and Privacy Policy
    </p>
  </form>
</div>

<style>
  form {
    max-width: 450px;
  }
  img {
    width: 100%;
  }
</style>
