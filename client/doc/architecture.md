# Application Architecture

## Directory Structure

Our application uses a Feature-Core-Common architecture with the following main directories:

### /common

Completely feature-agnostic components that could be used in any React application. These components should:

- Have no dependencies on other parts of our codebase
- Be purely presentational or have self-contained logic
- Be styled using CSS modules for encapsulation
- Consider publishing to npm if sufficiently generic

Example: Button, Card, TextField

### /core

Application composition and fundamental setup. This directory contains:

- Application bootstrap and providers
- Routing configuration
- Global styles and design tokens
- App-wide layouts and navigation
- Other "glue" code that ties features together

Example: app.tsx, router.tsx, layout/nav

### /feature

Feature modules that represent distinct pieces of business functionality. These typically:

- Correspond to major routes or sections of the application
- Contain their own components and logic
- May use common components
- Can access lib utilities
- Should not directly import from other features

Example: /feature/home, /feature/dashboard

### /lib

Configuration and initialization of third-party services. This includes:

- Relay/GraphQL setup
- Authentication configuration
- Logging/monitoring initialization
- Other external service setup

Example: /lib/relay, /lib/sentry

## Key Principles

1. **Directory Purpose**: Each directory has a clear, single purpose. If you're unsure where to put something, refer to the descriptions above.

2. **Dependency Flow**: Dependencies should flow in this direction:
   feature → core → common
   feature → lib
   core → lib

3. **Component Co-location**: Components should keep their files (.tsx, .css, tests) together in the same directory.

4. **Style Organization**:

   - Global styles live in core/style
   - Component styles use CSS modules and live with their components
   - Design tokens defined in core/style/tokens.css

5. **Feature Independence**: Features should be independent of each other to support code splitting and maintainability.

## Common Decisions

Q: Should this component go in common or feature?
A: If it's specific to your feature's business logic, keep it in feature. If it's generic and reusable, move it to common.

Q: Where do app-wide components like navigation go?
A: If they're tied to your app's structure or routing, they belong in core/layout.

Q: Should I create an abstraction layer for this third-party service?
A: Only if there's a clear benefit. Often, direct usage with proper containment in lib/ is simpler and more maintainable.
