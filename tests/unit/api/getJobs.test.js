import axios from 'axios';
vi.mock('axios'); // to mock axios library
import getJobs from "@/api/getJobs"

describe('Get jobs', ()=>{
    beforeEach(() => {
        axios.get.mockResolvedValue({
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
        expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
    })

    it('extracts jobs from response', async()=>{

        const jobs = await getJobs();
        expect(jobs).toEqual([{ id: 1, title: "Java Engineer" }]);
    })
})
