/**
 * PersistentTaskManager - TaskManager with localStorage integration
 * Extends TaskManager with automatic data persistence
 */

class PersistentTaskManager extends TaskManager {
    constructor(storageKey = 'taskManagerData') {
        super();
        this.storageManager = new StorageManager(storageKey);
        this.autoSave = true;
        this.loadData();
    }

    /**
     * Load data from localStorage on initialization
     */
    loadData() {
        const savedData = this.storageManager.load();
        if (savedData) {
            try {
                this.tasks = savedData.tasks || [];
                this.nextId = savedData.nextId || 1;
                console.log(`Loaded ${this.tasks.length} tasks from storage`);
            } catch (error) {
                console.error('Error loading saved data:', error);
                this.tasks = [];
                this.nextId = 1;
            }
        }
    }

    /**
     * Save data to localStorage
     */
    saveData() {
        if (!this.autoSave) return;

        const dataToSave = {
            tasks: this.tasks,
            nextId: this.nextId,
            lastSaved: new Date().toISOString()
        };

        const success = this.storageManager.save(dataToSave);
        if (!success) {
            console.warn('Failed to save data to localStorage');
        }
        return success;
    }

    /**
     * Override addTask to include auto-save
     */
    addTask(title, description = '', priority = 'medium') {
        const task = super.addTask(title, description, priority);
        this.saveData();
        return task;
    }

    /**
     * Override completeTask to include auto-save
     */
    completeTask(id) {
        const result = super.completeTask(id);
        if (result) {
            this.saveData();
        }
        return result;
    }

    /**
     * Override deleteTask to include auto-save
     */
    deleteTask(id) {
        const result = super.deleteTask(id);
        if (result) {
            this.saveData();
        }
        return result;
    }

    /**
     * Override clearAllTasks to include auto-save
     */
    clearAllTasks() {
        super.clearAllTasks();
        this.saveData();
    }

    /**
     * Enable or disable auto-save
     * @param {boolean} enabled - Whether to enable auto-save
     */
    setAutoSave(enabled) {
        this.autoSave = enabled;
        if (enabled) {
            this.saveData();
        }
    }

    /**
     * Force save data to localStorage
     * @returns {boolean} True if save was successful
     */
    forceSave() {
        return this.saveData();
    }

    /**
     * Create a backup of current data
     * @returns {Object} Backup data
     */
    createBackup() {
        return this.storageManager.createBackup();
    }

    /**
     * Restore data from backup
     * @param {Object} backup - Backup data
     * @returns {boolean} True if restore was successful
     */
    restoreFromBackup(backup) {
        const success = this.storageManager.restoreFromBackup(backup);
        if (success) {
            this.loadData();
        }
        return success;
    }

    /**
     * Export all data to file
     * @param {string} filename - Name of the export file
     * @returns {boolean} True if export was successful
     */
    exportToFile(filename = 'task-manager-backup.json') {
        const dataToExport = {
            tasks: this.tasks,
            nextId: this.nextId,
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };

        return this.storageManager.exportData(dataToExport, filename);
    }

    /**
     * Import data from file
     * @param {File} file - File to import
     * @returns {Promise<boolean>} True if import was successful
     */
    async importFromFile(file) {
        const importedData = await this.storageManager.importData(file);
        if (!importedData) {
            return false;
        }

        try {
            // Validate imported data structure
            if (importedData.tasks && Array.isArray(importedData.tasks)) {
                this.tasks = importedData.tasks;
                this.nextId = importedData.nextId || this.tasks.length + 1;
                this.saveData();
                return true;
            } else {
                console.error('Invalid data structure in imported file');
                return false;
            }
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    /**
     * Get storage information
     * @returns {Object} Storage usage statistics
     */
    getStorageInfo() {
        return this.storageManager.getStorageInfo();
    }

    /**
     * Clear all data from localStorage
     * @returns {boolean} True if clear was successful
     */
    clearStorage() {
        const success = this.storageManager.clear();
        if (success) {
            this.tasks = [];
            this.nextId = 1;
        }
        return success;
    }

    /**
     * Sync data with server (placeholder for future implementation)
     * @returns {Promise<boolean>} True if sync was successful
     */
    async syncWithServer() {
        // Placeholder for future server sync implementation
        console.log('Server sync not implemented yet');
        return false;
    }

    /**
     * Get data integrity report
     * @returns {Object} Data integrity information
     */
    getDataIntegrityReport() {
        const report = {
            totalTasks: this.tasks.length,
            validTasks: 0,
            invalidTasks: 0,
            issues: []
        };

        this.tasks.forEach((task, index) => {
            const issues = [];
            
            if (!task.id || typeof task.id !== 'number') {
                issues.push('Invalid or missing ID');
            }
            if (!task.title || typeof task.title !== 'string') {
                issues.push('Invalid or missing title');
            }
            if (!task.priority || !['low', 'medium', 'high'].includes(task.priority)) {
                issues.push('Invalid priority');
            }
            if (!task.status || !['pending', 'completed'].includes(task.status)) {
                issues.push('Invalid status');
            }

            if (issues.length === 0) {
                report.validTasks++;
            } else {
                report.invalidTasks++;
                report.issues.push({
                    taskIndex: index,
                    taskId: task.id,
                    issues: issues
                });
            }
        });

        return report;
    }
}
