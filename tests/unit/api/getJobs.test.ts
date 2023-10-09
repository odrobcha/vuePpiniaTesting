import type {Mock} from 'vitest';
import axios from 'axios';
vi.mock('axios'); // to mock axios library
const axiosGetMock = axios.get as Mock; //to makeTS interpreted axios.get as Mock
import getJobs from "@/api/getJobs"

describe('Get jobs', ()=>{
    beforeEach(() => {
        axiosGetMock.mockResolvedValue({
            data: [
                {
                    id: 1,
                    title: "Java Engineer",
                },
            ],
        });
    });
    it("Fetches jobs, that user can apply to", async ()=>{
        await getJobs();
        expect(axiosGetMock).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
    })

    it('extracts jobs from response', async()=>{

        const jobs = await getJobs();
        expect(jobs).toEqual([{ id: 1, title: "Java Engineer" }]);
    })
})
