# Task Manager Project

## Overview

Task Manager is a modern web application designed to help users organize and manage their daily tasks efficiently. Built with vanilla JavaScript, HTML, and CSS, it provides a clean and intuitive interface for task management with local data persistence.

## Features

The application offers comprehensive task management capabilities including task creation, completion tracking, priority assignment, and data export/import functionality. Users can filter tasks by status and maintain their task history through automatic localStorage integration.

## Architecture

The project follows a modular architecture with separate classes for different responsibilities. The TaskManager class handles core task operations, while PersistentTaskManager extends it with data persistence capabilities. The StorageManager class manages localStorage operations, and TaskManagerApp coordinates UI interactions.

## API Reference

### TaskManager Class

The TaskManager class provides core task management functionality:

- **addTask(title, description, priority)**: Creates a new task with specified parameters
- **completeTask(id)**: Marks a task as completed by its ID
- **deleteTask(id)**: Removes a task from the manager
- **getTasks(status)**: Retrieves tasks filtered by status (pending, completed, all)
- **getStats()**: Returns task statistics including completion rates

### PersistentTaskManager Class

Extends TaskManager with data persistence:

- **setAutoSave(enabled)**: Enables or disables automatic saving
- **forceSave()**: Manually saves data to localStorage
- **exportToFile(filename)**: Exports all data to a JSON file
- **importFromFile(file)**: Imports data from a JSON file
- **createBackup()**: Creates a backup of current data
- **restoreFromBackup(backup)**: Restores data from a backup

### StorageManager Class

Handles localStorage operations:

- **save(data)**: Saves data to localStorage with error handling
- **load()**: Loads data from localStorage
- **clear()**: Clears all stored data
- **getStorageInfo()**: Returns storage usage statistics
- **exportData(data, filename)**: Exports data as downloadable file
- **importData(file)**: Imports data from file
