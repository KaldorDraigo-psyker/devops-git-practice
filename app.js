/**
 * Main application JavaScript for Task Manager
 * Handles UI interactions and integrates with TaskManager
 */

class TaskManagerApp {
    constructor() {
        this.taskManager = new TaskManager();
        this.currentFilter = 'all';
        this.initializeApp();
    }

    /**
     * Initialize the application
     */
    initializeApp() {
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
        console.log('Task Manager App initialized');
    }

    /**
     * Bind event listeners to UI elements
     */
    bindEvents() {
        // Task form submission
        const taskForm = document.getElementById('taskForm');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
        }

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-buttons button');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilterChange(e));
        });

        // Task action buttons (delegated event handling)
        const tasksContainer = document.getElementById('tasksContainer');
        if (tasksContainer) {
            tasksContainer.addEventListener('click', (e) => this.handleTaskAction(e));
        }
    }

    /**
     * Handle task form submission
     */
    handleAddTask(event) {
        event.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;

        try {
            const newTask = this.taskManager.addTask(title, description, priority);
            this.renderTasks();
            this.updateStats();
            this.clearForm();
            this.showNotification('Task added successfully!', 'success');
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    /**
     * Handle filter button clicks
     */
    handleFilterChange(event) {
        const filter = event.target.id.replace('filter', '').toLowerCase();
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-buttons button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.renderTasks();
    }

    /**
     * Handle task action buttons (complete/delete)
     */
    handleTaskAction(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const action = event.target.dataset.action;

        if (!taskId || !action) return;

        switch (action) {
            case 'complete':
                this.completeTask(taskId);
                break;
            case 'delete':
                this.deleteTask(taskId);
                break;
        }
    }

    /**
     * Complete a task
     */
    completeTask(taskId) {
        const success = this.taskManager.completeTask(taskId);
        if (success) {
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task completed!', 'success');
        } else {
            this.showNotification('Task not found', 'error');
        }
    }

    /**
     * Delete a task
     */
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            const success = this.taskManager.deleteTask(taskId);
            if (success) {
                this.renderTasks();
                this.updateStats();
                this.showNotification('Task deleted!', 'success');
            } else {
                this.showNotification('Task not found', 'error');
            }
        }
    }

    /**
     * Render tasks based on current filter
     */
    renderTasks() {
        const tasksContainer = document.getElementById('tasksContainer');
        if (!tasksContainer) return;

        const tasks = this.taskManager.getTasks(this.currentFilter);
        
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<div class="no-tasks">No tasks found</div>';
            return;
        }

        tasksContainer.innerHTML = tasks.map(task => this.createTaskHTML(task)).join('');
    }

    /**
     * Create HTML for a single task
     */
    createTaskHTML(task) {
        const statusClass = task.status === 'completed' ? 'completed' : '';
        const priorityClass = `priority-${task.priority}`;
        
        return `
            <div class="task-item ${statusClass}" data-task-id="${task.id}">
                <div class="task-header">
                    <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    <span class="task-priority ${priorityClass}">${task.priority}</span>
                </div>
                ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                <div class="task-actions">
                    ${task.status === 'pending' ? 
                        `<button class="btn-complete" data-task-id="${task.id}" data-action="complete">Complete</button>` : 
                        `<span class="completed-badge">✅ Completed</span>`
                    }
                    <button class="btn-delete" data-task-id="${task.id}" data-action="delete">Delete</button>
                </div>
                <div class="task-meta">
                    <small>Created: ${new Date(task.createdAt).toLocaleDateString()}</small>
                    ${task.completedAt ? `<small>Completed: ${new Date(task.completedAt).toLocaleDateString()}</small>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Update statistics display
     */
    updateStats() {
        const stats = this.taskManager.getStats();
        
        // You can add a stats section to the HTML and update it here
        console.log('Task Statistics:', stats);
    }

    /**
     * Clear the task form
     */
    clearForm() {
        document.getElementById('taskForm').reset();
        document.getElementById('taskPriority').value = 'medium';
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '1000',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Export tasks to JSON
     */
    exportTasks() {
        const tasks = this.taskManager.getTasks();
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'tasks.json';
        link.click();
    }

    /**
     * Import tasks from JSON
     */
    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const tasks = JSON.parse(e.target.result);
                this.taskManager.clearAllTasks();
                tasks.forEach(task => {
                    this.taskManager.addTask(task.title, task.description, task.priority);
                    if (task.status === 'completed') {
                        this.taskManager.completeTask(task.id);
                    }
                });
                this.renderTasks();
                this.updateStats();
                this.showNotification('Tasks imported successfully!', 'success');
            } catch (error) {
                this.showNotification('Invalid file format', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskManagerApp = new TaskManagerApp();
});
