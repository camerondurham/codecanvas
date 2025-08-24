# Requirements Document

## Introduction

This feature involves migrating the existing vanilla JavaScript frontend of the code runner application to Next.js while maintaining all current functionality and similar styling. The current frontend is a single-page application that allows users to select programming languages, write code in a CodeMirror editor with syntax highlighting and themes, execute code on a remote server, and view the output. The migration should modernize the codebase, improve maintainability, and provide a better developer experience while preserving the existing user experience.

## Requirements

### Requirement 1

**User Story:** As a developer using the code runner, I want the same code editing experience with syntax highlighting and themes, so that I can continue to write and test code efficiently.

#### Acceptance Criteria

1. WHEN the user opens the application THEN the system SHALL display a CodeMirror editor with Python as the default language mode
2. WHEN the user selects a different programming language THEN the system SHALL update the editor's syntax highlighting mode accordingly
3. WHEN the user selects a theme from the theme dropdown THEN the system SHALL apply the selected CodeMirror theme to the editor
4. WHEN the user changes the language THEN the system SHALL load appropriate sample code for that language
5. IF the language is python3/python THEN the system SHALL load the fibonacci Python sample code
6. IF the language is node/nodejs/js/javascript THEN the system SHALL load the Node.js uptime sample code
7. IF the language is c++/cpp/c++11 THEN the system SHALL load the C++ threading sample code
8. IF the language is go/golang THEN the system SHALL load the Go hello world sample code
9. IF the language is bash/sh THEN the system SHALL load the bash fibonacci sample code
10. IF the language is rust THEN the system SHALL load the Rust struct sample code

### Requirement 2

**User Story:** As a developer using the code runner, I want to execute my code and see the results, so that I can test and debug my programs.

#### Acceptance Criteria

1. WHEN the user clicks the Submit button THEN the system SHALL send a POST request to the runner API with the current code and selected language
2. WHEN the API request is successful THEN the system SHALL display the stdout, stderr, and error outputs in separate sections
3. WHEN the API request fails THEN the system SHALL display an error message with the failure details
4. WHEN displaying output THEN the system SHALL preserve formatting using preformatted text elements
5. WHEN there is no output for a field THEN the system SHALL display "none" for that field

### Requirement 3

**User Story:** As a developer using the code runner, I want the application to automatically load available programming languages, so that I can choose from all supported languages.

#### Acceptance Criteria

1. WHEN the application loads THEN the system SHALL fetch available languages from the /api/v1/languages endpoint
2. WHEN the languages are successfully fetched THEN the system SHALL populate the language dropdown with all available options
3. WHEN the language fetch fails THEN the system SHALL display "Error!" in the language dropdown and log the error
4. WHEN languages are loaded THEN the system SHALL set the first language as the default selection

### Requirement 4

**User Story:** As a user, I want the application to have a modern, responsive design that works well on different screen sizes, so that I can use it comfortably on various devices.

#### Acceptance Criteria

1. WHEN the user views the application THEN the system SHALL display a responsive layout that adapts to different screen sizes
2. WHEN the user has dark mode preference THEN the system SHALL apply dark theme colors automatically
3. WHEN the user has light mode preference THEN the system SHALL apply light theme colors automatically
4. WHEN displaying the interface THEN the system SHALL maintain the current visual hierarchy with header, selectors, editor, submit button, and output sections
5. WHEN rendering text THEN the system SHALL use the IBM Plex Mono font family for consistency

### Requirement 5

**User Story:** As a developer maintaining the code runner, I want the frontend to be built with Next.js and modern React patterns, so that the codebase is more maintainable and follows current best practices.

#### Acceptance Criteria

1. WHEN building the application THEN the system SHALL use Next.js as the primary framework
2. WHEN structuring components THEN the system SHALL use React functional components with hooks
3. WHEN managing state THEN the system SHALL use appropriate React state management patterns
4. WHEN handling API calls THEN the system SHALL use modern async/await patterns or React Query
5. WHEN styling components THEN the system SHALL use CSS modules, styled-components, or Tailwind CSS for maintainable styling
6. WHEN building for production THEN the system SHALL generate optimized static assets
7. WHEN developing THEN the system SHALL provide hot reload functionality for improved developer experience

### Requirement 6

**User Story:** As a user, I want the application to maintain the same API endpoints and configuration, so that it continues to work with the existing backend infrastructure.

#### Acceptance Criteria

1. WHEN making API requests THEN the system SHALL use the same endpoint URLs (/api/v1/run and /api/v1/languages)
2. WHEN configuring the API base URL THEN the system SHALL use https://runner.fly.dev/api/v1/ as the default
3. WHEN sending run requests THEN the system SHALL maintain the same request format with source and language fields
4. WHEN receiving responses THEN the system SHALL handle the same response format with stdout, stderr, and error fields
5. WHEN in development mode THEN the system SHALL allow easy switching to localhost:10100 for local testing