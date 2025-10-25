# Contributing to Light Strip Library

Thank you for your interest in contributing to the Light Strip Library! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abossard/light-strip-library.git
   cd light-strip-library
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The demo will be available at `http://localhost:3000`

5. **Run tests:**
   ```bash
   # Install Playwright browsers (first time only)
   npx playwright install
   
   # Run screenshot tests
   npm run screenshot
   ```

## Project Structure

```
light-strip-library/
├── src/                    # Source code
│   ├── LightStrip.tsx     # Main React component for LED strips
│   ├── AnimationFramework.ts  # Animation utilities
│   ├── Benchmark.ts       # Performance benchmarking
│   ├── ArtNetListener.ts  # ArtNet protocol support
│   ├── E131Listener.ts    # E1.31 protocol support
│   ├── Server.ts          # WebSocket server for protocols
│   ├── types.ts           # TypeScript type definitions
│   ├── logger.ts          # Debug logging utilities
│   ├── examples/          # Example components
│   │   ├── straight.tsx   # Straight LED strip example
│   │   ├── circular.tsx   # Circular LED strip example
│   │   └── square.tsx     # Square LED strip example
│   └── index.ts           # Main library exports
├── demo/                   # Demo application
├── tests/                  # Test files
│   └── screenshots.spec.ts # Playwright screenshot tests
├── dist/                   # Build output (generated)
├── screenshots/            # Generated screenshots (git-tracked)
├── .github/               # GitHub configuration
│   ├── workflows/         # GitHub Actions workflows
│   └── copilot.yml        # GitHub Copilot configuration
└── README.md              # Project documentation
```

## Making Changes

### Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write clean, readable code
   - Follow existing code style
   - Add TypeScript types where appropriate
   - Update documentation if needed

3. **Test your changes:**
   ```bash
   npm run build
   npm run dev  # Manually test in browser
   npm run screenshot  # Run automated tests
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

### Types of Contributions

- **Bug fixes:** Fix issues in existing functionality
- **New features:** Add new LED patterns, animations, or capabilities
- **Documentation:** Improve README, add examples, fix typos
- **Performance:** Optimize rendering or animation performance
- **Tests:** Add or improve test coverage

## Testing

### Manual Testing

1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000` in your browser
3. Test different LED strip configurations
4. Try various animation patterns
5. Check console for any errors

### Automated Testing

The project uses Playwright for screenshot testing:

```bash
# Run all screenshot tests
npm run screenshot

# View test results
npx playwright show-report
```

### Testing New Features

When adding new features:
1. Test with different LED strip configurations (straight, circular, square)
2. Test with different numbers of LEDs
3. Verify animations work smoothly
4. Check for memory leaks in long-running animations
5. Test color transitions and effects

## Submitting Changes

### Pull Request Process

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request:**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with:
     - Description of changes
     - Screenshots/GIFs if UI changes
     - Testing performed
     - Any breaking changes

3. **Address review feedback:**
   - Make requested changes
   - Push updates to your branch
   - Respond to reviewer comments

4. **Merge:**
   - Once approved, your PR will be merged
   - Delete your feature branch after merge

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed
- Keep changes minimal and relevant

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define types for function parameters and return values
- Avoid `any` type when possible
- Use interfaces for object shapes

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use TypeScript for prop types

### Code Style

- Use 2 spaces for indentation
- Use semicolons at end of statements
- Use single quotes for strings
- Keep lines under 100 characters when practical
- Add comments for complex logic

### Naming Conventions

- **Files:** PascalCase for components (`LightStrip.tsx`), camelCase for utilities (`logger.ts`)
- **Components:** PascalCase (`LightStripComponent`)
- **Functions:** camelCase (`setLEDColor`)
- **Constants:** UPPER_SNAKE_CASE (`DEFAULT_LED_COUNT`)
- **Types/Interfaces:** PascalCase (`ColorSetup`, `LightStripDetails`)

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- First line: brief summary (50 chars or less)
- Separate subject from body with a blank line
- Body: explain what and why, not how

Examples:
```
Add rainbow wave animation pattern

Implement smooth color transition across all LEDs in a wave pattern.
Includes configurable wave speed and color spectrum.
```

## Getting Help

- **Issues:** Browse existing issues or create a new one
- **Discussions:** Use GitHub Discussions for questions
- **Documentation:** Check the README and ARCHITECTURE.md

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC License).

Thank you for contributing to Light Strip Library! 🎨✨
