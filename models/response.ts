export const missionParameters = (paramNames: string[]) => {
    const message = `missing parametes ${paramNames.join(',')}`;
    return {
        statusCode: 400,
        statusMessage: message,
        body: JSON.stringify({
          message: message,
        }, null, 2)
    }
}