import randomToken from '../randomToken';
describe('random token generator', () => {
    it('should generate text with length = 10', () => {
        const token = randomToken(10);
        expect(token.length).toBe(10);
    })
})