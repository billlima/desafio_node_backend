import { DateUtils } from "../date.utils";

describe('Date Utils', () => {

    test('toFormatDB', async () => {
        expect.assertions(2);
        
        const dateString = '2020-01-01 08:55:55';
        const date = new Date(dateString);
        
        expect(DateUtils.toFormatDB(date))
            .toEqual("2020-01-01T08:55:55-03:00");
        expect(DateUtils.toFormatDB()).not.toBeNull();
    });
});