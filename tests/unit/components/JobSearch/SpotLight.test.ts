import {Mock} from "vitest";
import { render, screen } from '@testing-library/vue';
import axios from 'axios';
import {vi} from 'vitest';
vi.mock("axios");
import SpotLight from '../../../../src/components/JobSearch/SpotLight.vue';

const axiosGetMock = axios.get as Mock;

describe('SpotLigth', () => {
    const mockSpotLightResponse = (spotligth  = {})=>{
        axiosGetMock.mockResolvedValue({
            data: [{
                id: 1,
                img: 'Some image',
                title: "Some title",
                description : "Some description",
                ...spotligth,
            }]
        });
    };


    it('Provide image to parent component', async() => {
       const spotLight = {img: 'Other img'};
        mockSpotLightResponse(spotLight);

        render(SpotLight, {
            slots: {
                default : `<template #default="slotProps">
                            <h1>{{slotProps.img}}</h1>
                        </template>`
            }
        });

       const text = await screen.findByText("Other img");
       expect(text).toBeInTheDocument();
    });

    it('Provide title to parent component', async() => {
        const spotLight = {title: 'Other title'};
        mockSpotLightResponse(spotLight);
        render(SpotLight, {
            slots: {
                default : `<template #default="slotProps">
                            <h1>{{slotProps.title}}</h1>
                        </template>`
            }
        });

        const text = await screen.findByText("Other title");
        expect(text).toBeInTheDocument();
    });

    it('Provide description to parent component', async() => {
        const spotLight = {description: 'Other description'};
        mockSpotLightResponse(spotLight);
        render(SpotLight, {
            slots: {
                default : `<template #default="slotProps">
                            <h1>{{slotProps.description}}</h1>
                        </template>`
            }
        });

        const text = await screen.findByText("Other description");
        expect(text).toBeInTheDocument();
    });
});
