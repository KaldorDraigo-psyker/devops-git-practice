/**
 * TaskManager - Core class for managing tasks
 * Handles task creation, completion, deletion, and filtering
 */
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    /**
     * Add a new task to the manager
     * @param {string} title - Task title
     * @param {string} description - Task description
     * @param {string} priority - Task priority (low, medium, high)
     * @returns {Object} The created task object
     */
    addTask(title, description = '', priority = 'medium') {
        if (!title || title.trim() === '') {
            throw new Error('Task title is required');
        }

        const task = {
            id: this.nextId++,
            title: title.trim(),
            description: description.trim(),
            priority: priority.toLowerCase(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.push(task);
        return task;
    }

    /**
     * Mark a task as completed
     * @param {number} id - Task ID
     * @returns {boolean} True if task was found and completed
     */
    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = 'completed';
            task.completedAt = new Date().toISOString();
            return true;
        }
        return false;
    }

    /**
     * Delete a task from the manager
     * @param {number} id - Task ID
     * @returns {boolean} True if task was found and deleted
     */
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }

    /**
     * Get tasks filtered by status
     * @param {string} status - Task status (pending, completed, or 'all')
     * @returns {Array} Array of tasks matching the status
     */
    getTasks(status = 'all') {
        if (status === 'all') {
            return [...this.tasks];
        }
        return this.tasks.filter(task => task.status === status);
    }

    /**
     * Get a specific task by ID
     * @param {number} id - Task ID
     * @returns {Object|null} Task object or null if not found
     */
    getTaskById(id) {
        return this.tasks.find(task => task.id === id) || null;
    }

    /**
     * Get task statistics
     * @returns {Object} Statistics about tasks
     */
    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        
        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
        };
    }

    /**
     * Clear all tasks
     */
    clearAllTasks() {
        this.tasks = [];
        this.nextId = 1;
    }

    /**
     * Get tasks sorted by priority
     * @param {string} order - Sort order ('asc' or 'desc')
     * @returns {Array} Sorted array of tasks
     */
    getTasksByPriority(order = 'desc') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return [...this.tasks].sort((a, b) => {
            const aPriority = priorityOrder[a.priority] || 0;
            const bPriority = priorityOrder[b.priority] || 0;
            return order === 'desc' ? bPriority - aPriority : aPriority - bPriority;
        });
    }
}
