# Playwright E2E Testing Project

This repository contains end-to-end tests using Playwright, a modern automation framework for web testing.

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
npx playwright test --ui
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

## 🔧 Configuration

The project configuration is defined in `playwright.config.ts`. Key features include:
- Parallel test execution
- Automatic retries on CI
- HTML report generation
- Trace capture on failure

## 📁 Project Structure

```
├── tests/                  # Test files
├── playwright/.auth/       # Authentication states
├── playwright-report/      # Test reports
└── test-results/          # Test artifacts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. 