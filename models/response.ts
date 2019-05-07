export const missingParameters = (queryParams: string[] = [], pathParams: string[] = [], bodyParams: string[] = []) => {
  const messages: string[] = [];
  if (queryParams.length > 0) {
    messages.push(`missing query parametes ${queryParams.join(',')}`);
  }
  if (pathParams.length > 0) {
    messages.push(`missing path parametes ${pathParams.join(',')}`);
  }
  if (bodyParams.length > 0) {
    messages.push(`missing body keys ${bodyParams.join(',')}`);
  }
  return {
    statusCode: 400,
    statusMessage: messages.join('\n'),
    body: JSON.stringify({
      message: messages.join('\n'),
    }, null, 2)
  }
}