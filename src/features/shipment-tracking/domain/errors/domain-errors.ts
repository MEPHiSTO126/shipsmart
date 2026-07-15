// src/features/shipment-tracking/domain/errors/domain-errors.ts

export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export class ShipmentNotFoundError extends DomainError {
  constructor(trackingNumber: string) {
    super(`Shipment not found: ${trackingNumber}`, 'SHIPMENT_NOT_FOUND');
    this.name = 'ShipmentNotFoundError';
  }
}

export class InvalidStatusTransitionError extends DomainError {
  constructor(from: string, to: string) {
    super(`Invalid status transition: ${from} → ${to}`, 'INVALID_TRANSITION');
    this.name = 'InvalidStatusTransitionError';
  }
}

export class NetworkError extends DomainError {
  constructor(
    message: string,
    public readonly statusCode?: number,
  ) {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string,
  ) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

// Type guard helpers
export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError;
}

export function isNotFoundError(
  error: unknown,
): error is ShipmentNotFoundError {
  return error instanceof ShipmentNotFoundError;
}

export function isInvalidTransitionError(
  error: unknown,
): error is InvalidStatusTransitionError {
  return error instanceof InvalidStatusTransitionError;
}
