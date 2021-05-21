import { writable } from 'svelte/store';

export const compatibility = writable(true);

export const termsAndConditionOpen = writable(false);


export const userToken = writable(undefined);
export const userLogin = writable(undefined);

export const pin = writable(undefined);
export const pinFromUrl = writable(false);

export const lastRecording = writable(false);

export const recordingState = writable("new");