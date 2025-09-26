# Task Manager Project

## Overview

Task Manager is a modern web application designed to help users organize and manage their daily tasks efficiently. Built with vanilla JavaScript, HTML, and CSS, it provides a clean and intuitive interface for task management with local data persistence.

## Features

The application offers comprehensive task management capabilities including task creation, completion tracking, priority assignment, and data export/import functionality. Users can filter tasks by status and maintain their task history through automatic localStorage integration.

## Architecture

The project follows a modular architecture with separate classes for different responsibilities. The TaskManager class handles core task operations, while PersistentTaskManager extends it with data persistence capabilities. The StorageManager class manages localStorage operations, and TaskManagerApp coordinates UI interactions.

## API Reference

The TaskManager class provides methods for adding tasks (addTask), completing tasks (completeTask), deleting tasks (deleteTask), and retrieving tasks by status (getTasks). The PersistentTaskManager adds automatic saving and loading functionality, while the StorageManager handles data export/import operations.
