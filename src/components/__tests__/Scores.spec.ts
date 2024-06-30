import {describe, expect, it, vi} from "vitest";
import type {Score} from "../../types";
import axios from "axios";
import {flushPromises, shallowMount} from "@vue/test-utils";
import Scores from "../Scores.vue";

describe("Scores", () => {
    vi.mock('axios')
    const emptyResponse: Score[] = []
    const twoItemResponse: Score[] = [
        {score: 50, acc: 100, mode: 'easy'},
        {score: 40, acc: 90, mode: 'easy'}
    ]

    it('should render list from backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValue({data: twoItemResponse})
        const wrapper = shallowMount(Scores)
        await flushPromises()
        expect(wrapper.text()).toContain('50')
        expect(wrapper.text()).toContain('40')
    });

    it('should display info if list from backend is empty', async () => {
        vi.mocked(axios, true).get.mockResolvedValue({data: emptyResponse})
        const wrapper = shallowMount(Scores)
        await flushPromises()
        expect(wrapper.text()).toContain('No Scores yet, start typing!')
    });
})