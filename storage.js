/**
 * StorageManager - Handles data persistence using localStorage
 * Provides methods for saving, loading, and managing task data
 */

class StorageManager {
    constructor(storageKey = 'taskManagerData') {
        this.storageKey = storageKey;
        this.isAvailable = this.checkStorageAvailability();
    }

    /**
     * Check if localStorage is available
     * @returns {boolean} True if localStorage is available
     */
    checkStorageAvailability() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            console.warn('localStorage is not available:', e.message);
            return false;
        }
    }

    /**
     * Save data to localStorage
     * @param {Object} data - Data to save
     * @returns {boolean} True if save was successful
     */
    save(data) {
        if (!this.isAvailable) {
            console.error('Cannot save data: localStorage is not available');
            return false;
        }

        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(this.storageKey, serializedData);
            console.log('Data saved successfully to localStorage');
            return true;
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
            return false;
        }
    }

    /**
     * Load data from localStorage
     * @returns {Object|null} Loaded data or null if not found/error
     */
    load() {
        if (!this.isAvailable) {
            console.error('Cannot load data: localStorage is not available');
            return null;
        }

        try {
            const serializedData = localStorage.getItem(this.storageKey);
            if (serializedData === null) {
                console.log('No data found in localStorage');
                return null;
            }

            const data = JSON.parse(serializedData);
            console.log('Data loaded successfully from localStorage');
            return data;
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return null;
        }
    }

    /**
     * Clear all data from localStorage
     * @returns {boolean} True if clear was successful
     */
    clear() {
        if (!this.isAvailable) {
            console.error('Cannot clear data: localStorage is not available');
            return false;
        }

        try {
            localStorage.removeItem(this.storageKey);
            console.log('Data cleared successfully from localStorage');
            return true;
        } catch (error) {
            console.error('Error clearing data from localStorage:', error);
            return false;
        }
    }

    /**
     * Get storage usage information
     * @returns {Object} Storage usage statistics
     */
    getStorageInfo() {
        if (!this.isAvailable) {
            return { available: false, error: 'localStorage not available' };
        }

        try {
            const data = localStorage.getItem(this.storageKey);
            const dataSize = data ? new Blob([data]).size : 0;
            
            // Estimate total localStorage capacity (varies by browser)
            let totalCapacity = 0;
            try {
                // Try to estimate capacity by filling storage
                let testData = '';
                while (true) {
                    testData += 'x'.repeat(1024); // 1KB chunks
                    localStorage.setItem('__capacity_test__', testData);
                }
            } catch (e) {
                totalCapacity = testData.length;
                localStorage.removeItem('__capacity_test__');
            }

            return {
                available: true,
                dataSize: dataSize,
                dataSizeKB: Math.round(dataSize / 1024 * 100) / 100,
                totalCapacity: totalCapacity,
                totalCapacityKB: Math.round(totalCapacity / 1024 * 100) / 100,
                usagePercentage: totalCapacity > 0 ? Math.round((dataSize / totalCapacity) * 100) : 0
            };
        } catch (error) {
            return { available: false, error: error.message };
        }
    }

    /**
     * Export data as downloadable file
     * @param {Object} data - Data to export
     * @param {string} filename - Name of the file
     * @returns {boolean} True if export was successful
     */
    exportData(data, filename = 'task-manager-backup.json') {
        try {
            const serializedData = JSON.stringify(data, null, 2);
            const blob = new Blob([serializedData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            console.log(`Data exported successfully as ${filename}`);
            return true;
        } catch (error) {
            console.error('Error exporting data:', error);
            return false;
        }
    }

    /**
     * Import data from file
     * @param {File} file - File to import
     * @returns {Promise<Object|null>} Imported data or null if error
     */
    async importData(file) {
        return new Promise((resolve) => {
            if (!file) {
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    console.log('Data imported successfully from file');
                    resolve(data);
                } catch (error) {
                    console.error('Error parsing imported file:', error);
                    resolve(null);
                }
            };
            reader.onerror = () => {
                console.error('Error reading file');
                resolve(null);
            };
            reader.readAsText(file);
        });
    }

    /**
     * Create a backup of current data
     * @returns {Object} Backup data with timestamp
     */
    createBackup() {
        const data = this.load();
        if (!data) {
            return null;
        }

        const backup = {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            data: data
        };

        return backup;
    }

    /**
     * Restore data from backup
     * @param {Object} backup - Backup data
     * @returns {boolean} True if restore was successful
     */
    restoreFromBackup(backup) {
        if (!backup || !backup.data) {
            console.error('Invalid backup data');
            return false;
        }

        return this.save(backup.data);
    }

    /**
     * Migrate data from old format to new format
     * @param {Object} oldData - Data in old format
     * @returns {Object} Data in new format
     */
    migrateData(oldData) {
        // Example migration logic
        if (oldData && oldData.tasks) {
            // Add new fields if they don't exist
            oldData.tasks.forEach(task => {
                if (!task.createdAt) {
                    task.createdAt = new Date().toISOString();
                }
                if (!task.completedAt && task.status === 'completed') {
                    task.completedAt = new Date().toISOString();
                }
            });
        }

        return oldData;
    }
}
