# Contributing to Task Manager

Thank you for your interest in contributing to the Task Manager project! This document provides guidelines and information for developers who want to contribute to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Branch Strategy](#branch-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

## 🤝 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful**: Treat all contributors with respect and kindness
- **Be constructive**: Provide helpful feedback and suggestions
- **Be collaborative**: Work together to improve the project
- **Be patient**: Remember that everyone is learning and contributing in their own way

## 🚀 Getting Started

### Prerequisites

- Modern web browser with JavaScript enabled
- Git installed on your system
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of Git workflows

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/devops-git-practice.git
   cd devops-git-practice
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/originalowner/devops-git-practice.git
   ```

## 🛠️ Development Setup

### Local Development

1. Serve the project using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

2. Open `http://localhost:8000` in your browser

3. Open `http://localhost:8000/ui-demo.html` for the demo page

### Testing Setup

Run the test suites in your browser console:

```javascript
// Test core functionality
new TaskManagerTests().runAllTests();

// Test storage functionality
new StorageTests().runAllTests();
```

## 🌿 Branch Strategy

We follow a feature branch workflow:

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Examples

```bash
feature/task-search
bugfix/localStorage-error
docs/api-documentation
refactor/css-organization
```

### Branch Creation

```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... code changes ...

# Commit your changes
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```bash
feat: add task search functionality
fix: resolve localStorage quota exceeded error
docs: update API documentation for TaskManager
style: improve button hover effects
refactor: extract common validation logic
test: add tests for export functionality
chore: update dependencies
```

### Commit Body

For complex changes, include a detailed description:

```bash
feat: add task search functionality

- Implement search by title and description
- Add case-insensitive matching
- Include priority and status filters
- Add search result highlighting
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch**: Make sure your branch is up to date with the main branch
   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/your-feature
   git rebase main
   ```

2. **Run tests**: Ensure all tests pass
   ```javascript
   new TaskManagerTests().runAllTests();
   new StorageTests().runAllTests();
   ```

3. **Test manually**: Verify your changes work as expected

4. **Update documentation**: Update README.md or other docs if needed

### Pull Request Template

When creating a pull request, include:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks**: Ensure all automated checks pass
2. **Code review**: Maintainers will review your code
3. **Feedback**: Address any feedback or requested changes
4. **Merge**: Once approved, your PR will be merged

## 🎨 Code Style

### JavaScript

- Use ES6+ features
- Follow consistent naming conventions:
  - `camelCase` for variables and functions
  - `PascalCase` for classes
  - `UPPER_CASE` for constants
- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Use semicolons consistently

```javascript
/**
 * Add a new task to the manager
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @param {string} priority - Task priority
 * @returns {Object} The created task object
 */
function addTask(title, description = '', priority = 'medium') {
    // Implementation
}
```

### CSS

- Use consistent indentation (2 spaces)
- Group related properties together
- Use meaningful class names
- Follow BEM methodology for complex components
- Use CSS Grid and Flexbox for layouts

```css
.task-item {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
}

.task-item--completed {
    opacity: 0.7;
    background: #e8f5e8;
}
```

### HTML

- Use semantic HTML elements
- Include proper accessibility attributes
- Maintain consistent indentation
- Use meaningful IDs and classes

```html
<main class="task-list">
    <h2>Tasks</h2>
    <div id="tasksContainer" role="list" aria-label="Task list">
        <!-- Tasks will be dynamically added here -->
    </div>
</main>
```

## 🧪 Testing Requirements

### Test Coverage

All new features must include:

1. **Unit tests**: Test individual functions and methods
2. **Integration tests**: Test component interactions
3. **Manual testing**: Verify UI functionality

### Test Structure

```javascript
/**
 * Test suite for new functionality
 */
class NewFeatureTests {
    constructor() {
        this.testResults = [];
    }

    runAllTests() {
        this.testBasicFunctionality();
        this.testEdgeCases();
        this.testErrorHandling();
        this.printResults();
    }

    testBasicFunctionality() {
        // Test implementation
    }

    assert(condition, message) {
        if (condition) {
            this.testResults.push({ status: 'PASS', message });
        } else {
            this.testResults.push({ status: 'FAIL', message });
            console.error(`❌ FAIL: ${message}`);
        }
    }
}
```

### Running Tests

```javascript
// Run all tests
new TaskManagerTests().runAllTests();
new StorageTests().runAllTests();

// Run specific test suite
new NewFeatureTests().runAllTests();
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for all public methods
- Include parameter types and return values
- Provide usage examples for complex functions

### README Updates

When adding new features:

1. Update the Features section
2. Add usage examples
3. Update the API Reference
4. Include any new dependencies or requirements

### Changelog

Update the CHANGELOG section in README.md:

```markdown
### v1.1.0 (2024-XX-XX)

#### Added
- New feature description
- Additional functionality

#### Changed
- Updated existing feature

#### Fixed
- Bug fix description
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Detailed steps to reproduce the bug
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**: Browser, OS, and version information
6. **Screenshots**: If applicable

## 💡 Feature Requests

When suggesting features:

1. **Use case**: Describe the problem you're trying to solve
2. **Proposed solution**: How you think it should work
3. **Alternatives**: Other solutions you've considered
4. **Additional context**: Any other relevant information

## 📞 Getting Help

If you need help:

1. Check existing [Issues](https://github.com/yourusername/devops-git-practice/issues)
2. Search the documentation
3. Ask questions in discussions
4. Contact maintainers

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Task Manager! 🚀
