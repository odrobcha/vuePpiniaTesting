import type {Mock} from 'vitest';
import axios from 'axios';
vi.mock('axios'); // to mock axios library
const axiosGetMock = axios.get as Mock; //to makeTS interpreted axios.get as Mock
import getDegrees from "@/api/getDegrees"

describe('Get degrees', ()=>{
    beforeEach(() => {
        axiosGetMock.mockResolvedValue({
            data: [
                {
                    "id": 1,
                    "degree": "Associate",
                },
            ],
        });
    });
    it("Fetches degrees, that user can apply to", async ()=>{
        await getDegrees();
        expect(axiosGetMock).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
    })

    it('extracts degrees from response', async()=>{

        const degrees = await getDegrees();
        expect(degrees).toEqual([{ id: 1, degree: "Associate" }]);
    })
})
