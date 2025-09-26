# Task Manager

A modern, responsive web application for managing tasks with local data persistence.

## 🚀 Features

- **Task Management**: Create, complete, and delete tasks with priority levels
- **Data Persistence**: Automatic saving to localStorage with backup/restore functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Export/Import**: Save and load task data as JSON files
- **Filtering**: View tasks by status (all, pending, completed)
- **Priority System**: Organize tasks by priority (low, medium, high)
- **Comprehensive Testing**: Full test suites for all functionality

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)

## 🛠️ Installation

### Prerequisites

- Modern web browser with JavaScript enabled
- No server required - runs entirely in the browser

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devops-git-practice.git
   cd devops-git-practice
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

3. Start managing your tasks!

### Development Setup

For development and testing:

1. Serve the files using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

2. Open `http://localhost:8000` in your browser

## 🎯 Usage

### Basic Task Management

1. **Adding Tasks**: Fill out the form with title, description, and priority
2. **Completing Tasks**: Click the "Complete" button on pending tasks
3. **Deleting Tasks**: Click the "Delete" button to remove tasks
4. **Filtering**: Use the filter buttons to view different task states

### Advanced Features

- **Export Tasks**: Click "Export Tasks" to download your data as JSON
- **Import Tasks**: Click "Import Tasks" to load previously exported data
- **Auto-Save**: All changes are automatically saved to localStorage
- **Data Backup**: Use the demo page to test backup and restore functionality

### Demo Page

Visit `ui-demo.html` for an interactive demonstration of all features.

## 🏗️ Architecture

### Core Classes

#### TaskManager
The main class for task operations:
- `addTask(title, description, priority)` - Create new tasks
- `completeTask(id)` - Mark tasks as completed
- `deleteTask(id)` - Remove tasks
- `getTasks(status)` - Filter tasks by status
- `getStats()` - Get task statistics

#### PersistentTaskManager
Extends TaskManager with data persistence:
- Automatic localStorage integration
- Backup and restore functionality
- Export/import capabilities
- Data integrity checking

#### StorageManager
Handles localStorage operations:
- Save/load data with error handling
- Storage availability checking
- Export/import file operations
- Backup creation and restoration

#### TaskManagerApp
Manages UI interactions:
- Event handling for forms and buttons
- Task rendering and filtering
- Notification system
- Export/import UI integration

### File Structure

```
devops-git-practice/
├── index.html              # Main application page
├── ui-demo.html           # Interactive demo page
├── styles.css             # Application styling
├── taskManager.js         # Core TaskManager class
├── persistentTaskManager.js # TaskManager with persistence
├── storage.js             # localStorage management
├── app.js                 # UI application logic
├── tests.js               # TaskManager test suite
├── storage-tests.js       # Storage functionality tests
├── demo.js                # TaskManager demo script
├── README.md              # This file
└── CONTRIBUTING.md        # Contribution guidelines
```

## 📚 API Reference

### TaskManager Methods

```javascript
// Create a new task
const task = taskManager.addTask('Learn JavaScript', 'Complete the course', 'high');

// Complete a task
const success = taskManager.completeTask(1);

// Delete a task
const deleted = taskManager.deleteTask(1);

// Get tasks by status
const pendingTasks = taskManager.getTasks('pending');
const allTasks = taskManager.getTasks('all');

// Get task statistics
const stats = taskManager.getStats();
// Returns: { total: 5, completed: 2, pending: 3, completionRate: 40 }
```

### PersistentTaskManager Methods

```javascript
// Create persistent manager
const persistentManager = new PersistentTaskManager();

// Enable/disable auto-save
persistentManager.setAutoSave(false);

// Force save
persistentManager.forceSave();

// Export data
persistentManager.exportToFile('my-tasks.json');

// Import data
await persistentManager.importFromFile(file);

// Get storage info
const info = persistentManager.getStorageInfo();
```

## 💡 Examples

### Basic Usage

```javascript
// Initialize the application
const taskManager = new TaskManager();

// Add some tasks
taskManager.addTask('Buy groceries', 'Milk, bread, eggs', 'medium');
taskManager.addTask('Learn React', 'Complete React tutorial', 'high');
taskManager.addTask('Exercise', 'Go for a run', 'low');

// Complete a task
taskManager.completeTask(1);

// Get all pending tasks
const pending = taskManager.getTasks('pending');
console.log(`You have ${pending.length} pending tasks`);
```

### Using Persistent Storage

```javascript
// Create persistent manager
const persistentManager = new PersistentTaskManager();

// Add tasks (automatically saved)
persistentManager.addTask('Persistent task', 'This will be saved', 'high');

// Create backup
const backup = persistentManager.createBackup();

// Restore from backup
persistentManager.restoreFromBackup(backup);
```

### Custom Storage Key

```javascript
// Use custom storage key
const customManager = new PersistentTaskManager('my-custom-key');
```

## 🧪 Testing

### Running Tests

Open the browser console and run:

```javascript
// Test TaskManager functionality
new TaskManagerTests().runAllTests();

// Test storage functionality
new StorageTests().runAllTests();

// Run TaskManager demo
runTaskManagerDemo();
```

### Test Coverage

- ✅ Task CRUD operations
- ✅ Data validation and error handling
- ✅ localStorage operations
- ✅ Export/import functionality
- ✅ Backup and restore
- ✅ UI interactions
- ✅ Data integrity checking

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

### v1.0.0 (2024-01-XX)

#### Added
- Initial release of Task Manager
- TaskManager class with CRUD operations
- PersistentTaskManager with localStorage integration
- Responsive web interface
- Export/import functionality
- Comprehensive test suites
- Demo page with interactive examples

#### Features
- ✅ Task creation, completion, and deletion
- ✅ Priority system (low, medium, high)
- ✅ Task filtering by status
- ✅ Automatic data persistence
- ✅ Backup and restore functionality
- ✅ Export/import as JSON files
- ✅ Responsive design for mobile and desktop
- ✅ Notification system
- ✅ Data integrity checking
- ✅ Comprehensive error handling

#### Technical Details
- Pure JavaScript (no external dependencies)
- localStorage for data persistence
- Modern ES6+ features
- Responsive CSS Grid and Flexbox
- Comprehensive JSDoc documentation
- Full test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as part of DevOps and Git practices learning
- Inspired by modern task management applications
- Uses modern web standards and best practices

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/devops-git-practice/issues) page
2. Run the test suites to verify functionality
3. Check browser console for error messages
4. Ensure localStorage is available in your browser

---

**Happy Task Managing! 🎉**
