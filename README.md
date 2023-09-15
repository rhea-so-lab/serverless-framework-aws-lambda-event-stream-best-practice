# Serverless Framework (AWS Lambda EventStream Best Practice)

## Usage

```sh
npm i
npm run deploy
open test.html
```

## Lambda

```typescript
exports.handler = awslambda.streamifyResponse(
  async (_event: any, responseStream: any, _context: any) => {
    responseStream.setContentType("text/event-stream"); // default: application/octet-stream
    setTimeout(() => responseStream.write("data: Hello, \n\n"), 1000); // "data: " and "\n\n" is required
    setTimeout(() => responseStream.write("data: World!\n\n"), 2000);
    setTimeout(() => responseStream.end(), 3000);
  }
);
```

## Browser

```html
<script>
  const eventSource = new EventSource(`LAMBDA_FUNCTION_URL`);

  eventSource.onmessage = function (e) {
    alert(e.data);
  };
</script>
```

## Serverless Framework

```yml
functions:
  app:
    handler: dist/index.handler
    url:
      invokeMode: RESPONSE_STREAM
```

> **Note**  
> `invokeMode: RESPONSE_STREAM` works from serverlss@3.34.0
