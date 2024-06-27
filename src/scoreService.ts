import axios, {type AxiosResponse} from "axios";
import type {Score} from "@/types";
import type {Ref} from "vue";
import {ref} from "vue";

export const recentScores: Ref<Score[]> = ref([]);
export const topscoresEasy: Ref<Score[]> = ref([]);
export const topscoresMedium: Ref<Score[]> = ref([]);
export const topscoresHard: Ref<Score[]> = ref([]);

//von thing-frontend inspiriert
export async function loadScores () {
    recentScores.value = [];
    topscoresEasy.value = [];
    topscoresMedium.value = [];
    topscoresHard.value = [];

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
    const endpoint = baseUrl + '/typer/recentscores';
    const response: AxiosResponse = await axios.get(endpoint);
    const responseData: Score[] = response.data;
    responseData.forEach((score: Score) => {
        console.log('score:', score); // Debug: Log
        recentScores.value.push(score);
    })
    await setTopscores();
}

async function setTopscores() {
    await setEasyTopscores();
    await setMediumTopscores();
    await setHardTopscores();
}

async function setEasyTopscores() {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
    const endpoint = baseUrl + '/typer/topscores/easy';
    const response: AxiosResponse = await axios.get(endpoint);
    const responseData: Score[] = response.data;
    responseData.forEach((score: Score) => {
        console.log('score:', score); // Debug: Log
        topscoresEasy.value.push(score);
    })
}

async function setMediumTopscores() {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
    const endpoint = baseUrl + '/typer/topscores/medium';
    const response: AxiosResponse = await axios.get(endpoint);
    const responseData: Score[] = response.data;
    responseData.forEach((score: Score) => {
        console.log('score:', score); // Debug: Log
        topscoresMedium.value.push(score);
    })
}

async function setHardTopscores() {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
    const endpoint = baseUrl + '/typer/topscores/hard';
    const response: AxiosResponse = await axios.get(endpoint);
    const responseData: Score[] = response.data;
    responseData.forEach((score: Score) => {
        console.log('score:', score); // Debug: Log
        topscoresHard.value.push(score);
    })
}