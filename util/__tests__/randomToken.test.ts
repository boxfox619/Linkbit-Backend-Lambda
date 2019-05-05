import randomToken from '../randomToken';
describe('test', () => {
    it('test', () => {
        const token = randomToken(10);
        expect(token.length).toBe(10);
    })
})