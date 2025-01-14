# Playwright E2E Testing Project

This repository contains end-to-end tests using Playwright, focusing on both API and UI testing with TypeScript.

## 🎯 Project Overview

- **Testing Approach**: Combined API and UI testing strategy
- **Language**: TypeScript
- **Framework**: Playwright
- **Package Manager**: npm
- **Test Organization**: Given/When/Then pattern in test comments

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/slawekradzyminski/playwright-january.git
cd playwright-january
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests in AI-friendly mode (list reporter)
```bash
npm run test:ai
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
```

## 📊 Test Reports

After test execution, HTML report will be generated in the `playwright-report` directory. To view it:
```bash
npx playwright show-report
```

## 🔧 Project Structure

```
├── tests/                    # Test files
│   ├── api/                 # API test specs
│   ├── ui/                  # UI test specs
│   └── fixtures/            # Test fixtures and shared utilities
├── types/                   # TypeScript type definitions
├── http/                    # HTTP client implementations
├── utils/                   # Utility functions and constants
├── generators/              # Test data generators
├── prompthistory/          # AI conversation history
├── playwright-report/       # Test reports
└── test-results/           # Test artifacts
```

## 🤖 AI-Friendly Features

1. **Type System**
   - TypeScript types are centralized in `/types` directory
   - Strong typing for API requests/responses

2. **Test Structure**
   - Tests follow Given/When/Then pattern in comments
   - API tests are ordered by response status code (200 first, then 400, 403, 404)
   - Separate UI and API test directories

3. **Fixtures and Generators**
   - Reusable authentication fixtures
   - Data generators for test data

4. **Prompt History**
   - AI conversations are saved in `/prompthistory`
   - Helps maintain context and development history

5. **HTTP Layer**
   - Abstracted HTTP calls in `/http` directory
   - Typed request/response handling

## 🔄 Development Workflow

1. Tests are organized by type (API/UI)
2. Each feature has corresponding test files
3. Shared code is extracted into fixtures and utilities
4. AI prompts are preserved for context

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. 