/* eslint-disable @typescript-eslint/no-require-imports */
const { TextDecoder, TextEncoder } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder, writable: true, configurable: true },
  TextEncoder: { value: TextEncoder, writable: true, configurable: true },
});

// Polyfill MessageChannel, MessagePort, and BroadcastChannel for undici/msw
const {
  MessageChannel,
  MessagePort,
  BroadcastChannel,
} = require('node:worker_threads');

Object.defineProperties(globalThis, {
  MessageChannel: { value: MessageChannel, writable: true, configurable: true },
  MessagePort: { value: MessagePort, writable: true, configurable: true },
  BroadcastChannel: {
    value: BroadcastChannel,
    writable: true,
    configurable: true,
  },
});

// Polyfill streams before importing undici (as undici depends on ReadableStream)
const {
  ReadableStream,
  WritableStream,
  TransformStream,
} = require('node:stream/web');

Object.defineProperties(globalThis, {
  ReadableStream: { value: ReadableStream, writable: true, configurable: true },
  WritableStream: { value: WritableStream, writable: true, configurable: true },
  TransformStream: {
    value: TransformStream,
    writable: true,
    configurable: true,
  },
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
  Blob: { value: Blob, writable: true, configurable: true },
  File: { value: File, writable: true, configurable: true },
  Headers: { value: Headers, writable: true, configurable: true },
  FormData: { value: FormData, writable: true, configurable: true },
  Request: { value: Request, writable: true, configurable: true },
  Response: { value: Response, writable: true, configurable: true },
  fetch: { value: fetch, writable: true, configurable: true },
});
