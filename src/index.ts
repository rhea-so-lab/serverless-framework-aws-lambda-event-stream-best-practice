// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

declare const awslambda: any;

exports.handler = awslambda.streamifyResponse(
  async (_event: any, responseStream: any, _context: any) => {
    responseStream.setContentType("text/event-stream");
    setTimeout(() => responseStream.write("data: Hello, \n\n"), 1000);
    setTimeout(() => responseStream.write("data: World!\n\n"), 2000);
    setTimeout(() => responseStream.end(), 3000);
  }
);
