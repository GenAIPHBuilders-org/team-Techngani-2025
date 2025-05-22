# Sikatly.AI Server - Authentication System

## Overview

This document describes the server-side implementation of the authentication system for Sikatly.AI. The system uses JWT (JSON Web Tokens) for secure authentication and provides GraphQL APIs for user registration, login, and session management.

## Authentication Flow

1. **User Registration**:

   - Client submits user details via GraphQL mutation
   - Server validates input, hashes password, and stores in database
   - Returns confirmation of successful registration

2. **User Login**:

   - Client submits credentials via GraphQL mutation
   - Server validates credentials against stored data
   - On success, generates JWT access token
   - Returns user data and token to client

3. **Session Management**:
   - Client stores JWT in secure HTTP-only cookie
   - Token is validated on each protected request
   - Expired tokens trigger re-authentication

## GraphQL Endpoints

### Mutations

#### `createUser`

Creates a new user account in the system.

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
```

Input:

- `name`: User's full name
- `email`: User's email address
- `password`: User's password (min 8 characters)

#### `login`

Authenticates a user and returns session data.

```graphql
mutation Login($input: LoginUserInput!) {
  login(input: $input) {
    id
    name
    email
    avatar
    accessToken
  }
}
```

Input:

- `email`: User's email address
- `password`: User's password

### Queries

#### `me`

Returns the currently authenticated user's data.

```graphql
query Me {
  me {
    id
    name
    email
    avatar
  }
}
```

## Security Measures

1. **Password Security**:

   - Passwords are hashed using bcrypt with appropriate salt rounds
   - Plain text passwords are never stored or returned

2. **JWT Configuration**:

   - Tokens have appropriate expiration time (7 days)
   - Tokens are signed with a secure secret key
   - Protected headers to prevent tampering

3. **Request Protection**:
   - Authentication guards on protected resolvers and routes
   - CSRF protection measures implemented
   - Rate limiting to prevent brute force attacks

## Data Model

The User model includes:

- `id`: Unique identifier
- `name`: User's full name
- `email`: User's email address (unique)
- `password`: Hashed password
- `avatar`: URL to user's profile picture (optional)
- `createdAt`: Timestamp of account creation
- `updatedAt`: Timestamp of last account update

## Recent Updates

- Added avatar support in the user model
- Improved JWT handling with better expiration strategies
- Added support for user session management
- Enhanced security with HTTP-only cookies
- Implemented resolver-level authorization guards
