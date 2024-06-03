Here's a README file for your Loyalty SDK npm package:

---

# Loyalty SDK

The Loyalty SDK is a TypeScript library that provides an interface to interact with the Loyalty API. It simplifies the process of integrating loyalty features into your applications.

## Installation

You can install the Loyalty SDK via npm:

```bash
npm install loyalty-sdk
```

## Usage

### Importing

```typescript
import { LoyaltySdk } from "loyalty-sdk";
```

### Initializing

```typescript
const apiKey = "your-api-key";
const sdk = new LoyaltySdk(apiKey);
```

### Methods

#### `getPoints`

```typescript
const data = { address: "some-address", eventName: "some-event" };
const response = await sdk.getPoints(data);
```

#### `addPoints`

```typescript
const data = { address: "some-address", amount: 100, eventName: "some-event" };
const response = await sdk.addPoints(data);
```

#### `createProject`

```typescript
const data = { id: "some-id" };
const response = await sdk.createProject(data);
```

### Error Handling

The SDK provides error handling for various scenarios, including network errors, server errors, unauthorized errors, validation errors, and unknown errors.

```typescript
const response = await sdk.getPoints(data);
if (response instanceof Error) {
  console.error("Error:", response.message);
} else {
  console.log("Response:", response);
}
```
